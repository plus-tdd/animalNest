import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import Logger from './../logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger(process.env.NODE_ENV);
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl: url, params, query, body, headers } = req;

    const originalSend = res.send;
    res.send = function (body) {
      const responseBody = body instanceof Object ? JSON.stringify(body) : body;
      const { method, originalUrl: url } = req;
      const statusCode = res.statusCode;

      // 응답 전송
      res.send = originalSend;
      res.send(body);

      // 로그 남기기
      this.logger.info(
        `${method} ${url} StatusCode: ${statusCode}\n[REQUEST] \nParams: ${JSON.stringify(
          params,
        )} \nQuery: ${JSON.stringify(query)} \nBody: ${JSON.stringify(
          body,
        )} \nHeaders: ${JSON.stringify(
          headers,
        )} \n[RESPONSE] \n \nBody: ${responseBody}`,
      );
    }.bind(this);

    // res.on('finish', () => {
    //   console.log(
    //     'ip:',
    //     req.ip,
    //     'method:',
    //     req.method,
    //     'statusCode:',
    //     res.statusCode,
    //   );
    //   this.logger.info(
    //     `${req.ip} ${req.method} ${res.statusCode} ${res.ResBody}`,
    //     req.originalUrl,
    //   );
    // });

    next();
  }
}
