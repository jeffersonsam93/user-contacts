import { Dialect } from 'sequelize/types';
import { IDatabaseConfig } from './interfaces/database.interface';

export const config: IDatabaseConfig = {
    development: {
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'mysql',
        database: process.env.DB_NAME || 'mysql',
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 3306,
        dialect: 'mysql',
        logging: false,
        force: true,
        timezone: '+08:00',
    },
    production: {
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'jefferson@93',
        database: process.env.DB_NAME || 'mysql',
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 3306,
        dialect: 'mysql',
        logging: false,
        force: true,
        timezone: '+08:00',
    },
};
