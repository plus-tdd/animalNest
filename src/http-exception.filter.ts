import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import moment from 'moment';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const error = exception.getResponse() as
      | string
      | { error: string; statusCode: number; message: string | string[] };
    console.log(
      'exception.getResponse()',
      exception.getResponse(),
      'typeof error:',
      typeof error,
    );
    if (typeof error === 'string') {
      response.status(status).json({
        success: false,
        statusCode: status,
        timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        path: request.url,
        error: error,
      });
    } else {
      response.status(status).json({
        success: false,
        timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        path: request.url,
        ...error,
      });
    }
  }
}
