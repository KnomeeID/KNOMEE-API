import * as fs from 'fs';
import * as path from 'path';
import { config as configDotenv } from 'dotenv';
import { EnvironmentFile, Environments } from './environment.constant';
import IEnvironment from './environment.interface';

class Environment implements IEnvironment {
	public applyEncryption: boolean;

	public auth0Audience: string;

	public auth0Domain: string;

	public clientOriginUrl: string;

	public dbHost: string;

	public dbName: string;

	public dbPassword: string;

	public dbPort: number;

	public dbUser: string;

	public env: Environments;

	public port: number;

	public secretKey: string;

	/**
	 *
	 * @param NODE_ENV
	 */
	constructor(NODE_ENV?: Environments) {
		// set API variables
		this.env =
			NODE_ENV ||
			(process.env.NODE_ENV as Environments) ||
			Environments.LOCAL;
		this.setEnvironment(this.env);

		const port: string | undefined | number = process.env.PORT || 6060;
		this.port = Number(port);

		this.applyEncryption = JSON.parse(process.env.APPLY_ENCRYPTION);
		this.secretKey = process.env.SECRET_KEY;

		// set database variables
		this.dbHost = process.env.DB_HOST || '';
		this.dbName = process.env.DB_NAME || '';
		this.dbPassword = process.env.DB_PASSWORD || '';
		this.dbPort = Number(process.env.DB_PORT) || 5432;
		this.dbUser = process.env.DB_USER || '';

		// set auth configuration
		this.auth0Audience = process.env.AUTH_AUDIENCE || '';
		this.auth0Domain = process.env.AUTH0_DOMAIN || '';
		this.clientOriginUrl = process.env.CLIENT_ORIGIN_URL || '';
	}

	/**
	 *
	 * @returns
	 */
	public getCurrentEnvironment(): string {
		return this.env;
	}

	/**
	 *
	 * @param env
	 */
	public setEnvironment(env: Environments): void {
		let envPath: string;
		this.env = env || Environments.LOCAL;
		const rootdir: string = path.resolve(__dirname, '../../');
		switch (env) {
			case Environments.PRODUCTION:
				envPath = path.resolve(rootdir, EnvironmentFile.PRODUCTION);
				break;
			case Environments.TEST:
				envPath = path.resolve(rootdir, EnvironmentFile.TEST);
				break;
			case Environments.STAGING:
				envPath = path.resolve(rootdir, EnvironmentFile.STAGING);
				break;
			case Environments.LOCAL:
				envPath = path.resolve(rootdir, EnvironmentFile.LOCAL);
				break;
			default:
				envPath = path.resolve(rootdir, EnvironmentFile.LOCAL);
		}
		if (!fs.existsSync(envPath)) {
			throw new Error('.env file is missing in root directory');
		}
		configDotenv({ path: envPath });
	}

	/**
	 *
	 * @returns
	 */
	public isProductionEnvironment(): boolean {
		return this.getCurrentEnvironment() === Environments.PRODUCTION;
	}

	/**
	 *
	 * @returns
	 */
	public isDevEnvironment(): boolean {
		return this.getCurrentEnvironment() === Environments.LOCAL;
	}

	/**
	 *
	 * @returns
	 */
	public isTestEnvironment(): boolean {
		return this.getCurrentEnvironment() === Environments.TEST;
	}

	/**
	 *
	 * @returns
	 */
	public isStagingEnvironment(): boolean {
		return this.getCurrentEnvironment() === Environments.STAGING;
	}
}

export default Environment;
