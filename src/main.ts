import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/infraestructure/http/http-exception.filter';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'dev') {
    const config = new DocumentBuilder()
      .setTitle('NESTJS REACTIVE PROGRAMMING API By Santiago Arango')
      .setDescription('Documentación de la API generada automáticamente')
      .setVersion('1.0')
      .addTag('Health', 'Endpoints de estado de salud')
      .addTag('Products', 'Operaciones con productos')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalFilters(new HttpExceptionFilter());

  const port = process.env.APP_PORT || 3000;
  await app.listen(port);
}
bootstrap();