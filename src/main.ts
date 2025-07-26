import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/infraestructure/http/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('NESTJS REACTIVE PROGRAMMING API By Santiago Arango')
    .setDescription('Documentación de la API generada automáticamente')
    .setVersion('1.0')
    .addTag('Health', 'Endpoints de estado de salud')
    .addTag('Products', 'Operaciones con productos')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();