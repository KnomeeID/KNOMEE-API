import { DataTypes } from 'sequelize';
import type { Migration } from '../umzug';
import baseEntityAttributes from '../base-entity-attributes';

export const up: Migration = async ({ context: sequelize }) => {
	await sequelize.getQueryInterface().createTable('user', {
		user_auth_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		...baseEntityAttributes,
	});
};

export const down: Migration = async ({ context: sequelize }) => {
	await sequelize.getQueryInterface().dropTable('user');
};
