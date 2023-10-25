import {
	Unique,
	Model,
	AutoIncrement,
	Column,
	PrimaryKey,
	DataType,
} from 'sequelize-typescript';

export interface EntityAttributes {
	id: string;
	internalId: number;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date;
}

export default abstract class Entity<
	T extends object,
	U extends object,
> extends Model<T, U> {
	@PrimaryKey
	@Column({
		type: DataType.UUID,
		defaultValue: DataType.UUID,
	})
	id!: string;

	@Unique
	@AutoIncrement
	@Column({
		type: DataType.INTEGER,
	})
	internalId!: number;
}
