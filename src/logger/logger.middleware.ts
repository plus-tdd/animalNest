import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import Logger from './../logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger(process.env.NODE_ENV);
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl: url, params, query, body, headers } = req;

    const originalSend = res.send;
    res.send = function (responseBody) {
      const statusCode = res.statusCode;

      // 응답 전송
      res.send = originalSend;
      res.send(responseBody);

      // 로그 남기기
      this.logger.info(
        `${method} ${url} ${statusCode}\n[REQUEST] \nParams: ${JSON.stringify(
          params,
        )}Query: ${JSON.stringify(query)}Body: ${JSON.stringify(
          body,
        )}Headers: ${JSON.stringify(
          headers,
        )}\n[RESPONSE]\nStatus:${statusCode}\nBody: ${responseBody}`,
      );
    }.bind(this);

    next();
  }
}
