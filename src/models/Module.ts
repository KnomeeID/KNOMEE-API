import { Column, DataType, Table, Unique } from 'sequelize-typescript';
import Entity, { EntityAttributes } from './Entity';

export interface ModuleAttributes extends EntityAttributes {
	name: string;
}

export type ModuleCreationAttributes = Omit<
	ModuleAttributes,
	'createdAt' | 'updatedAt' | 'internalId' | 'id' | 'deletedAt'
>;

@Table({
	timestamps: true,
	paranoid: true,
	tableName: 'module',
	underscored: true,
})
export default class Module extends Entity<
	ModuleAttributes,
	ModuleCreationAttributes
> {
	constuctor(name: string) {
		this.name = name;
	}

	@Unique
	@Column({ type: DataType.STRING })
	name!: string;
}
