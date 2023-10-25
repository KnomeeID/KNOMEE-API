import {
	Column,
	DataType,
	ForeignKey,
	HasMany,
	Table,
} from 'sequelize-typescript';
import { PictureAttributes } from '../lib/types/Picture';
import Entity, { EntityAttributes } from './Entity';
import QuestionOption, { QuestionOptionAttributes } from './Question-Option';

const { BOOLEAN, JSONB, STRING } = DataType;

export enum QuestionType {
	SELECT_ONE_MULTIPLE_CHOICE = 'selectOneMultipleChoice',
	SELECT_ONE_DROPDOWN = 'selectOneDropdown',
	SELECT_ONE_PICTURE = 'selectOnePicture',
	SELECT_MANY_MULTIPLE_CHOICE = 'selectManyCheckBox',
	SELECT_MANY_DROPDOWN = 'selectManyDropdown',
	SELECT_MANY_PICTURE = 'selectManyPicture',
	A_OR_B_SWIPE = 'aOrBSwipe',
	TRUE_FALSE = 'trueOrFalse',
	RANKING = 'ranking',
	SCALE = 'scale',
	FREE_FORM_LONG = 'freeFormLong',
	FREE_FORM_SHORT = 'freeFormShort',
}

export interface QuestionAttributes extends EntityAttributes {
	text: string;
	type: QuestionType;
	picture?: PictureAttributes;
	allowCustomResponse?: boolean;
}

// this is housed here so as to not create a circular reference.
export interface QuestionOptionCreationAttributes {
	questionId: number;
	text: string;
	picture?: PictureAttributes;
}

export type QuestionCreationAttributes = Omit<
	QuestionAttributes,
	'createdAt' | 'updatedAt' | 'internalId' | 'id' | 'deletedAt'
> & {
	options: QuestionOptionCreationAttributes[];
};

@Table({
	timestamps: true,
	paranoid: true,
	tableName: 'question',
	underscored: true,
})
export default class Question extends Entity<
	QuestionAttributes,
	QuestionCreationAttributes
> {
	constuctor(
		text: string,
		type: QuestionType,
		picture?: PictureAttributes,
		allowCustomResponse?: boolean,
	) {
		this.text = text;
		this.type = type;
		this.picture = picture;
		this.allowCustomResponse = allowCustomResponse || false;
	}

	@Column({ type: STRING })
	text: string;

	@Column({ type: STRING })
	type: QuestionType;

	@Column({ type: JSONB })
	picture: PictureAttributes;

	@Column({ type: BOOLEAN })
	allowCustomResponse: boolean;

	@HasMany(() => QuestionOption)
	questionOptions: QuestionOptionAttributes;
}
