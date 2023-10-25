import { Column, DataType, Table } from 'sequelize-typescript';
import Entity, { EntityAttributes } from './Entity';

const { BOOLEAN, STRING } = DataType;

export enum ConjunctionMeans {
	New_Paragraph = 'newParagraph',
	Inline = 'inline',
	Quote = 'quote',
	Subtitle = 'subtitle',
}

export interface TextSegmentCreationAttributes {
	text: string;
	isHighlighted?: boolean;
	conjunction?: ConjunctionMeans;
	link?: string;
}

export type TextSegmentAttributes = EntityAttributes &
	TextSegmentCreationAttributes;

@Table({
	timestamps: true,
	paranoid: true,
	tableName: 'text_segment',
	underscored: true,
})
export default class TextSegment extends Entity<
	TextSegmentAttributes,
	TextSegmentCreationAttributes
> {
	constuctor(text: string) {
		this.text = text;
	}

	@Column({ type: STRING })
	text: string;

	@Column({ type: BOOLEAN })
	isHighlighted: boolean;

	@Column({ type: STRING })
	conjunction: ConjunctionMeans;

	@Column({ type: STRING })
	link: string;
}
