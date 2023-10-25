import * as express from 'express';
import App from '../../src/App';
import logger from '../../src/lib/logger';
import { setGlobalEnvironment } from '../../src/global';
import Environment from '../../src/environments/environment';
import { Environments } from '../../src/environments/environment.constant';
import { migrator } from '../../src/database/umzug';
import db from '../../src/database';


export default class IntegrationHelpers {

    public static appInstance: express.Application;

    public static async getApp(): Promise<express.Application> {
        if (this.appInstance) {
            return this.appInstance;
        }
        const env: Environment = new Environment(Environments.TEST);
        setGlobalEnvironment(env);
        const app: App = new App();
        await app.init();
        this.appInstance = app.express;

        return this.appInstance;
    }

    public static async clearDatabase(): Promise<void> {
        await db.sync({force: true});
    }

    public static async runDatabaseMigrations():Promise<void> {
       await migrator.up();
    }
}


