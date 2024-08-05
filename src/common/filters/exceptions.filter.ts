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
      exceptionResponse.detail = exception.response.data['error']['details'];
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      exceptionResponse.statusCode = status;
      exceptionResponse.detail = exception.cause.toString();
    }

    if (status === 500) console.log(exception);
    // console.log(exception);
    response.status(status).json(exceptionResponse);
  }
}
