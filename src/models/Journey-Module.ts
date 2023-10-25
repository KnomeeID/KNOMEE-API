import { Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import Entity, { EntityAttributes } from './Entity';
import Journey from './Journey';
import Module from './Module';

export interface JourneyModuleAttributes extends EntityAttributes {
	journeyId: number;
	moduleId: number;
	position: number;
}

export type JourneyModuleCreationAttributes = Omit<
	JourneyModuleAttributes,
	'createdAt' | 'updatedAt' | 'internalId' | 'id' | 'deletedAt'
>;

@Table({
	timestamps: true,
	paranoid: true,
	tableName: 'journey_module',
	underscored: true,
})
export default class JourneyModule extends Entity<
	JourneyModuleAttributes,
	JourneyModuleCreationAttributes
> {
	constuctor(journeyId: number, moduleId: number, position: number) {
		this.journeyId = journeyId;
		this.moduleId = moduleId;
		this.position = position;
	}

	@ForeignKey(() => Journey)
	@Column({ type: DataType.INTEGER })
	journeyId!: number;

	@ForeignKey(() => Module)
	@Column({ type: DataType.INTEGER })
	moduleId: number;

	@Column({ type: DataType.INTEGER })
	position: number;
}
