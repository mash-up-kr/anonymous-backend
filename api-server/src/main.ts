import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { API_PREFIX, DOC_PATH } from './constants';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(API_PREFIX);

  const config = new DocumentBuilder()
    .setTitle('Appilogue API docs')
    .setDescription('어나니머쓱팀 프로젝트 Appilogue API 문서')
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(DOC_PATH, app, document);

  await app.listen(process.env.PORT || 9001);
}
bootstrap();
