import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '../shared/config.service';
import { Logger } from '@nestjs/common';
import { Users } from '../entity/user.entity';
import { UserImage } from '../entity/userimage.entity';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async (configService: ConfigService) => {
            const logger = new Logger("Connection");
            let config;
            config=configService.sequelizeOrmConfig;
            const sequelize = new Sequelize(config);
            sequelize.addModels([Users,UserImage]);
            sequelize
            .authenticate()
            .then(() => {
                logger.log('Connection has been established successfully.');
            })
            .catch(err => {
                logger.error('Unable to connect to the database:', err);
            });
            try{
                await sequelize.sync({ force: false });
            } catch(err){
                logger.error(err)
            }
            return sequelize;
        },
        inject: [ConfigService],
    },
];
