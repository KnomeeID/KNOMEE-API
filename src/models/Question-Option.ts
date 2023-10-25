import { BelongsTo, Column, DataType, Table } from 'sequelize-typescript';
import { PictureAttributes } from '../lib/types/Picture';
import Entity, { EntityAttributes } from './Entity';

const { JSONB, INTEGER, STRING } = DataType;

/*
    should be mirrored to QuestionOptionCreationAttributes on Question Model
    recreated to avoid circular dependency. 
*/

type CreationAttributes = {
	questionId: number;
	text: string;
	picture?: PictureAttributes;
};

export type QuestionOptionAttributes = EntityAttributes & CreationAttributes;

@Table({
	timestamps: true,
	paranoid: true,
	tableName: 'journey_module',
	underscored: true,
})
export default class QuestionOption extends Entity<
	QuestionOptionAttributes,
	CreationAttributes
> {
	constuctor(text: string, picture?: PictureAttributes) {
		this.text = text;
		this.picture = picture;
	}

	/*
    foreign key on Question, relationship added on Question to avoid
    circular dependency
    */
	@Column({ type: INTEGER })
	questionId: number;

	@Column({ type: STRING })
	text: string;

	@Column({ type: JSONB })
	picture?: PictureAttributes;
}
