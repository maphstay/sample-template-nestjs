import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  const port = process.env.API_PORT || 8000;
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.use(
    ['/api/docs'],
    basicAuth({
      challenge: true,
      users: {
        dev: process.env.DOCS_PASS,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Sample template nestjs API Doc')
    .setDescription("It's an API documentation")
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(port, async () => Logger.log(`----Application listening on port ${port}-----`));
}
bootstrap();
