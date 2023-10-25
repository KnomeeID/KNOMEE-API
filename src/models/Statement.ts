import { Column, DataType, Table, Unique } from 'sequelize-typescript';
import Entity, { EntityAttributes } from './Entity';

const { BOOLEAN, STRING } = DataType;

export interface StatementCreationAttributes {
	name: string;
	isNameATitle?: boolean;
}

export type StatementAttributes = EntityAttributes &
	StatementCreationAttributes;

@Table({
	timestamps: true,
	paranoid: true,
	tableName: 'journey',
	underscored: true,
})
export default class Statement extends Entity<
	StatementAttributes,
	StatementCreationAttributes
> {
	constuctor(name: string, isNameATitle?: boolean) {
		this.name = name;
		this.isNameATitle = isNameATitle || false;
	}

	@Column({ type: STRING })
	name!: string;

	@Column({ type: BOOLEAN })
	isNameATitle: boolean;
}
