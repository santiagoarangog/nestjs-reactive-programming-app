import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ApplicationException } from '../../domain/application.exception';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Ha ocurrido un error inesperado en el servidor.';
    let error = 'Internal Server Error';

    if (exception instanceof ApplicationException) {
      // Nuestras excepciones de negocio personalizadas
      message = exception.message;
      // Asignar un statusCode específico según el tipo de excepción
      if (exception.name === 'ProductNotFoundException') {
        statusCode = HttpStatus.NOT_FOUND;
        error = 'Not Found';
      } else {
        // Otras excepciones de negocio pueden ser un Bad Request
        statusCode = HttpStatus.BAD_REQUEST;
        error = 'Bad Request';
      }
    } else if (exception instanceof HttpException) {
      // Excepciones propias de NestJS (ej: las de validación con class-validator)
      const httpResponse = exception.getResponse() as any;
      statusCode = exception.getStatus();
      message = httpResponse.message || exception.message;
      error = httpResponse.error || 'Http Exception';
    }

    response.status(statusCode).json({
      statusCode,
      message,
      error,
    });
  }
}
