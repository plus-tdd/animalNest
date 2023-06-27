import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CounselingModule } from './module/counseling/counseling.module';
import { AuthModule } from './module/auth/auth.module';
import { AuthGuard } from './module/auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { PaymentModule } from './module/payment/payment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Counseling } from './module/counseling/domain/counseling.model';
import { JwtStrategy } from './module/auth/passport/auth.passport';
import { Payment } from './module/payment/output/entities/Payment';

import { AuthController } from './auth/auth.controller';
import { UserService } from './module/user/user.service';
import { UserModule } from './module/user/user.module';


// Module 설명 : express에서는 router위주의 설계였다면, nest에서는 module위주의 설계를 한다
// 기능별로 module을 만들어서 여기에 다 넣어줄거임 - nest가 module간의 연결된걸 파악해서 한번에 실행해줌
// app.module.ts가 중심이 되는 모듈이기 때문에, 다른 기능별 모듈을 연결시켜야 함
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: String(1225),
      database: 'animalnest',
      synchronize: true,
      entities: [Counseling],
    }),
    TypeOrmModule.forFeature([Counseling]),
    CounselingModule,
    AuthModule,
    PaymentModule,
    UserModule
  ],
  controllers: [AppController,AuthController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard, // AuthGuard 를 전역 Guard 로 선언
    // },
    {
      provide: APP_GUARD,
      useClass: AuthGuard, // AuthGuard 를 전역 Guard 로 선언
    },
    UserService,
  ],
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard, // AuthGuard 를 전역 Guard 로 선언
    // },
    // JwtStrategy, // JwtStrategy를 providers 배열에 추가
})
export class AppModule {}
