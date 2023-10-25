import { Column, DataType, Table, Unique } from 'sequelize-typescript';
import Entity, { EntityAttributes } from './Entity';

export interface UserCreationAttributes {
	userAuthId: string;
}
export type UserAttributes = EntityAttributes & UserCreationAttributes;

@Table({
	timestamps: true,
	paranoid: true,
	tableName: 'journey',
	underscored: true,
})
export default class User extends Entity<
	UserAttributes,
	UserCreationAttributes
> {
	constuctor(userAuthId: string) {
		this.userAuthId = userAuthId;
	}

	@Unique
	@Column({ type: DataType.STRING })
	userAuthId!: string;
}
