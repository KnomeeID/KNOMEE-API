import { Column, DataType, Table } from 'sequelize-typescript';
import { MediaAttributes } from '../lib/types/Media';
import Entity, { EntityAttributes } from './Entity';

export type MediaSegmentCreationAttributes = MediaAttributes;

export type MediaSegmentAttributes = EntityAttributes &
	MediaSegmentCreationAttributes;

@Table({
	timestamps: true,
	paranoid: true,
	tableName: 'media_segment',
	underscored: true,
})
export default class MediaSegment extends Entity<
	MediaSegmentAttributes,
	MediaSegmentCreationAttributes
> {
	constuctor(media: MediaAttributes) {
		this.media = media;
	}

	@Column({ type: DataType.JSONB })
	media: MediaAttributes;
}
