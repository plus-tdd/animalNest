import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import Logger from './logger';

@Controller() // prefix 엔드포인트
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): { statusCode: number; data: string } {
    const logger = new Logger('application.app.controller');
    console.log('???');
    logger.info('안녕하세요', '대문입니다.');
    const data = this.appService.getHello();
    return { statusCode: 200, data };
  }

  @Get('/health')
  getHealth(): { statusCode: number; data: string } {
    const logger = new Logger('application.app.controller');
    logger.warn('Health check', '서비스 정상 동작 확인');
    return { statusCode: 200, data: 'Health check passed!' };
  }

  @Get('/error')
  getError(): { statusCode: number; data: string } {
    const logger = new Logger('application.app.controller');
    try {
      const my_little_err = 'dont change this!!!';
      throw new Error(my_little_err);
      return { statusCode: 200, data: 'this is not error' };
    } catch (e) {
      logger.error(e, '끄앙');
      return { statusCode: 400, data: 'this is not error' };
    }
  }
}
