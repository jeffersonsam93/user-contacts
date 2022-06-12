import { Injectable } from '@nestjs/common';
import { config } from '../config/config.connection';

@Injectable()
export class ConfigService {
    get sequelizeOrmConfig() {
        return process.env.NODE_ENV==='production'?config.production:config.development;
    }
}
