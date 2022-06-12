import { Users } from '../user.entity';

export const userProviders = [{ provide: 'Users', useValue: Users }];