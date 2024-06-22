import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Events API')
    .setDescription('An API to manage events and their participants/creators')
    .setVersion('0.1')

    .setContact(
      'Pedro Henrique Nieto da Silva',
      'https://github.com/Pedroo-Nietoo',
      'pedronieto.2005@gmail.com',
    )
    .addServer('http://localhost:3000', 'Dev server')
    .addServer('http://schoolsapi.com', 'Prod server')

    .addTag('Auth', 'All about auth', {
      description: 'More info',
      url: 'https://github.com/Pedroo-Nietoo',
    })
    .addTag('Users', 'All about users', {
      description: 'More info',
      url: 'https://github.com/Pedroo-Nietoo',
    })
    .addTag('Health', 'All about service health check', {
      description: 'More info',
      url: 'https://github.com/Pedroo-Nietoo',
    })

    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
