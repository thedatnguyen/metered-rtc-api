import {
  ExceptionFilter,
  // Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { Request, Response } from 'express';

// @Catch(Error)
export class CustomException implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const exceptionResponse = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timeStamp: new Date().toISOString(),
      path: request.url,
      detail: 'Some error occurred',
    };
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof AxiosError) {
      status = exception.response.status;
      exceptionResponse.statusCode = status;
      exceptionResponse.detail = { ...exception.response.data };
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      exceptionResponse.statusCode = status;
      switch (status) {
        case 400: {
          exceptionResponse.detail = 'Not Found';
          break;
        }
        case 500: {
          exceptionResponse.detail = 'Internal Server Error';
          break;
        }
        default: {
          exceptionResponse.detail = exception.cause
            ? exception.cause.toString()
            : undefined;
        }
      }
    }

    if (status === 500) console.log(exception);
    response.status(status).json(exceptionResponse);
  }
}
