import { DataTypes } from 'sequelize';

const baseEntityAttributes = {
	internal_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true,
	},
	id: {
		type: DataTypes.UUID,
		allowNull: false,
	},
	created_at: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	updated_at: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	deleted_at: {
		type: DataTypes.DATE,
		allowNull: false,
	},
};

export default baseEntityAttributes;
