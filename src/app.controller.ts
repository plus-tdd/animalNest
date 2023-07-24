import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import Logger from "./logger";

@Controller() // prefix 엔드포인트
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello():  { statusCode: number; data: string } {
    const logger = new Logger('application.app.controller')
    logger.info('안녕하세요', '대문입니다.')
    const data = this.appService.getHello();
    return { statusCode: 200, data };
  }

  @Get('/health')
  getHealth(): { statusCode: number; data: string } {
    const logger = new Logger('application.app.controller')
    logger.debug('Health check', '서비스 정상 동작 확인')
    return { statusCode: 200, data: 'Health check passed!' };
  }
}

