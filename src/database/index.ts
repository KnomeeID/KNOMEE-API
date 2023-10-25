import { Sequelize } from 'sequelize-typescript';
import Environment from '../environments/environment';
import { setGlobalEnvironment } from '../global';
import User from '../models/User';

if (!global.environment) {
	setGlobalEnvironment(new Environment());
}

const { dbHost, dbName, dbPassword, dbPort, dbUser } = environment;

export const models = [User];

const db = new Sequelize(dbName, dbUser, dbPassword, {
	dialect: 'postgres',
	host: dbHost,
	models,
	port: dbPort,
});

export default db;
