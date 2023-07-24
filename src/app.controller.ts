import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import Logger from "./logger";

@Controller() // prefix 엔드포인트
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const logger = new Logger('application.app.controller')
    logger.info('안녕하세요', '대문입니다.')
    return this.appService.getHello();
  }
}
