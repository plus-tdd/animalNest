import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import Logger from "./logger";

declare const module: any;

async function bootstrap() {
  const logger = new Logger('application.main');
  const app = await NestFactory.create(AppModule);
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
  logger.debug('Hello, World!!!!! 로그 성공');

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
