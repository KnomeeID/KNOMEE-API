import { Umzug, SequelizeStorage } from 'umzug';
import db from '.';

export const migrator = new Umzug({
	migrations: {
		glob: ['migrations/*.ts', { cwd: __dirname }],
	},
	context: db,
	storage: new SequelizeStorage({ sequelize: db }),
	logger: console,
});

export type Migration = typeof migrator._types.migration;
