import { Logger, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './Users/users.module';

@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..','..', 'app','build'),
    exclude: ['/api*','/guide'],
  }),UsersModule,SharedModule,DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
