import { Environments } from './environment.constant';

interface IEnvironment {
	applyEncryption?: boolean;
	auth0Audience: string;
	auth0Domain: string;
	clientOriginUrl: string;
	dbHost: string;
	dbName: string;
	dbPassword: string;
	dbPort: number;
	dbUser: string;
	env: Environments;
	port: number;
	secretKey?: string;
	getCurrentEnvironment(): string;
	setEnvironment(env: string): void;
	isProductionEnvironment(): boolean;
	isDevEnvironment(): boolean;
	isTestEnvironment(): boolean;
	isStagingEnvironment(): boolean;
}

export default IEnvironment;
