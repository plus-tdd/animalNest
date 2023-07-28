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
        `${method} ${url} ${statusCode}\n ========================[REQUEST]========================\n` +
        `Params: ${JSON.stringify(params, null, 2)}\n` +
        `Query: ${JSON.stringify(query, null, 2).replace(/,/g, ',\n')}\n` +
        `Body: { \n` +
        Object.keys(body)
        .map((key) => `  "${key}": "${body[key]}"`)
        .join(",\n") +
         `\n}\n` +
        `Headers: {\n` +
        Object.keys(headers)
          .map((key) => `  "${key}": "${headers[key]}"`)
          .join(",\n") +
        `\n}\n` +
        `========================[RESPONSE]========================\n` +
        `Status:${statusCode}\n` +
        `Body: ${JSON.stringify(JSON.parse(responseBody), null, '').replace(/,/g, ',\n')}`
      );
    }.bind(this);

    next();
  }
}
