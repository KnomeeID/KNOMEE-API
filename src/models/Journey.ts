import { Column, DataType, Table, Unique } from 'sequelize-typescript';
import Entity, { EntityAttributes } from './Entity';

export interface JourneyAttributes extends EntityAttributes {
	name: string;
}

export type JourneyCreationAttributes = Omit<
	JourneyAttributes,
	'createdAt' | 'updatedAt' | 'internalId' | 'id' | 'deletedAt'
>;

@Table({
	timestamps: true,
	paranoid: true,
	tableName: 'journey',
	underscored: true,
})
export default class Journey extends Entity<
	JourneyAttributes,
	JourneyCreationAttributes
> {
	constuctor(name: string) {
		this.name = name;
	}

	@Unique
	@Column({ type: DataType.STRING })
	name!: string;
}
