import { Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import Entity, { EntityAttributes } from './Entity';
import MediaSegment from './Media-Segment';
import Statement from './Statement';
import TextSegment from './Text-Segment';

const { INTEGER } = DataType;

export interface StatementSegmentCreationAttributes {
	statementId: number;
	position: number;
	textSegmentId?: number;
	mediaSegmentId?: number;
}

export type StatementSegmentAttributes = EntityAttributes &
	StatementSegmentCreationAttributes;

@Table({
	timestamps: true,
	paranoid: true,
	tableName: 'statement_segment',
	underscored: true,
})
export default class StatementSegment extends Entity<
	StatementSegmentAttributes,
	StatementSegmentCreationAttributes
> {
	constuctor(statementId: number, position: number) {
		this.statementId = statementId;
		this.position = position;
	}

	@ForeignKey(() => Statement)
	@Column({ type: INTEGER })
	statementId: number;

	@Column({ type: INTEGER })
	position: number;

	@ForeignKey(() => TextSegment)
	@Column({ type: INTEGER })
	textSegmentId?: number;

	@ForeignKey(() => MediaSegment)
	@Column({ type: INTEGER })
	mediaSegmentId?: number;
}
