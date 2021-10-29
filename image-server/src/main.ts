import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { API_PREFIX, DOC_PATH } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix(API_PREFIX);

  const config = new DocumentBuilder()
    .setTitle('Appilogue Image API docs')
    .setDescription('어나니머쓱팀 프로젝트 Appilogue Image API 문서')
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(DOC_PATH, app, document);
  await app.listen(process.env.PORT || 9002);
}
bootstrap();
