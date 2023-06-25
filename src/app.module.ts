import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CounselingModule } from './counseling/counseling.module';

@Module({
  imports: [CounselingModule],
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { PaymentModule } from './module/payment/model';

@Module({
  imports: [AuthModulem, PaymentModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard, // AuthGuard 를 전역 Guard 로 선언
    },
  ],
})
export class AppModule {}
