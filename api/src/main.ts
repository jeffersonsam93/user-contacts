import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const port= process.env.NODE_PORT || 3005;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));
  app.setGlobalPrefix('api');
  const logger = new Logger("App");
  const config = new DocumentBuilder()
  .setTitle('Users')
  .setDescription('The users API description')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  app.enableCors({
    origin: '*',
    methods: 'GET, PUT, POST, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });
  SwaggerModule.setup('guide', app, document);
  logger.log(`Server listening to http://localhost:${port}`)
  await app.listen(port);
}
bootstrap();
