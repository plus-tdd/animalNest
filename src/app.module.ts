import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CounselingModule } from './module/counseling/counseling.module';
import { AuthModule } from './module/auth/auth.module';
import { AuthGuard } from './module/auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { PaymentModule } from './module/payment/payment.module';
import { JwtStrategy } from './module/auth/passport/auth.passport';

@Module({
  imports: [CounselingModule, AuthModule, PaymentModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard, // AuthGuard 를 전역 Guard 로 선언
    },
    JwtStrategy, // JwtStrategy를 providers 배열에 추가
  ],
})
export class AppModule {}
