import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { OpenAPIObject } from '@nestjs/swagger/dist/interfaces';
import { config } from '@app/config';

(async (): Promise<void> => {
  const app: INestApplication = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });

  const options: Omit<OpenAPIObject, 'components' | 'paths'> = new DocumentBuilder()
    .setTitle('luna')
    .setDescription('cooktak API Server')
    .setVersion(process.env.npm_package_version)
    .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.PORT, config.HOST);
})();
