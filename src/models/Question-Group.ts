import { Column, DataType, Table } from 'sequelize-typescript';
import Entity, { EntityAttributes } from './Entity';

export interface QuestionGroupCreationAttributes {
	name: string;
}

export type QuestionGroupAttributes = EntityAttributes &
	QuestionGroupCreationAttributes;

@Table({
	timestamps: true,
	paranoid: true,
	tableName: 'question_group',
	underscored: true,
})
export default class QuestionGroup extends Entity<
	QuestionGroupAttributes,
	QuestionGroupCreationAttributes
> {
	constuctor(name: string) {
		this.name = name;
	}

	@Column({ type: DataType.STRING })
	name: string;
}
