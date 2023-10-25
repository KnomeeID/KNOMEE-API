import { Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import Entity, { EntityAttributes } from './Entity';
import Module from './Module';
import Question from './Question';
import QuestionGroup from './Question-Group';
import Statement from './Statement';

const { INTEGER } = DataType;

export interface ModuleElementAttributes extends EntityAttributes {
	moduleId: number;
	position: number;
	statementId: number;
	questionGroupId: number;
	questionId: number;
}

export type ModuleElementCreationAttributes = Omit<
	ModuleElementAttributes,
	'createdAt' | 'updatedAt' | 'internalId' | 'id' | 'deletedAt'
>;

@Table({
	timestamps: true,
	paranoid: true,
	tableName: 'module_element',
	underscored: true,
})
export default class ModuleElement extends Entity<
	ModuleElementAttributes,
	ModuleElementCreationAttributes
> {
	constuctor(moduleId: number, position: number) {
		this.moduleId = moduleId;
		this.position = position;
	}

	@ForeignKey(() => Module)
	@Column({ type: DataType.INTEGER })
	moduleId: number;

	@Column({ type: DataType.INTEGER })
	position: number;

	@ForeignKey(() => QuestionGroup)
	@Column({ type: INTEGER })
	questionGroupId?: number;

	@ForeignKey(() => Question)
	@Column({ type: INTEGER })
	questionId?: number;

	@ForeignKey(() => Statement)
	@Column({ type: INTEGER })
	statementId?: number;
}
