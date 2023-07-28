import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import Logger from './logger';
import { HttpExceptionFilter } from './http-exception.filter';
import * as moment from 'moment-timezone';
import express from 'express';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
declare const module: any;

async function bootstrap() {
  const logger = new Logger('application.main');
  moment.tz.setDefault('Asia/Seoul'); // 서버 시간대를 전역으로 아시아 서울로 설정한다. 매번 리전 안정해줘도됨
  const app = await NestFactory.create(AppModule);

  // Moment.js를 한국 시간(KST)으로 설정
  moment.tz.setDefault('Asia/Seoul');

  app.useGlobalFilters(new HttpExceptionFilter());

  const port = process.env.PORT || 3000;

  const config = new DocumentBuilder()
    .setTitle('animalNest Api')
    .setDescription('동물병원 예약 시나리오 개발을 위한 API문서')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.log(`listening on port ${port}`);


  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
