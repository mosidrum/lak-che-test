import 'dotenv/config';

type EnvConfig = {
    PORT: number;
    DB_HOST: string;
    DB_PORT: number;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_DATABASE: string;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DB: string;
    POSTGRES_PORT: number
    NODE_ENV: string;
    LOG_LEVEL: string;
};

type ENV = Partial<EnvConfig> & {
    [K in keyof EnvConfig]: EnvConfig[K] | undefined;
};

const getConfig = (): ENV => ({
    PORT: Number(process.env.PORT),
    DB_HOST: process.env.DB_HOST,
    DB_PORT: Number(process.env.DB_PORT),
    DB_USERNAME: process.env. DB_USERNAME,
    DB_PASSWORD: process.env. DB_PASSWORD,
    DB_DATABASE: process.env. DB_DATABASE,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_DB: process.env.POSTGRES_DB,
    POSTGRES_PORT: Number(process.env.POSTGRES_PORT),
    NODE_ENV: process.env.NODE_ENV,
    LOG_LEVEL: process.env.LOG_LEVEL
});

const getSanitizedConfig = (config: ENV): EnvConfig => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in .env`);
        }
    }
    return config as EnvConfig;
};

const config = getConfig();

const sanitizedConfig = getSanitizedConfig(config);

export default sanitizedConfig;

