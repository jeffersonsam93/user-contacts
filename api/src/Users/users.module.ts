import { Logger, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { userProviders } from '../entity/providers/user.provider';
import { userimageProviders } from '../entity/providers/userimage.provider';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService,Logger,...userProviders,...userimageProviders],
})
export class UsersModule {}
