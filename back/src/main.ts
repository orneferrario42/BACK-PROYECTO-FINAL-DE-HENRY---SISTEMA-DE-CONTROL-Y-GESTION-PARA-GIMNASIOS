import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { auth } from 'express-openid-connect';
import { config as auth0Config } from './config/auth0.config';
import { loggerGlobal } from './middleware/logger.middleware';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'https://pf-henry-front-rouge.vercel.app',
      /https:\/\/pf-henry-front-.*\.vercel\.app$/,
      'http://localhost:3000',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: [
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Methods',
      'x-requested-with',
      'Access-Control-Allow-Headers',
      'authorization',
      'content-type',
    ],
  });
  app.use(loggerGlobal);
  app.use(auth(auth0Config));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('PowerTraining')
    .setDescription(
      'La API de PowerTraining proporciona un sistema integral de gestión y control de acceso para el gimnasio. Este sistema permite a los usuarios interactuar de manera eficiente con los recursos del gimnasio y acceder a una asistencia personalizada proporcionada por nuestros profesores. La API está diseñada para manejar diferentes tipos de usuarios, incluyendo profesores y clientes del gimnasio, cada uno con permisos y funcionalidades específicas.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3001;

await app.listen(port);
}



bootstrap();
