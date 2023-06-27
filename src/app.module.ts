import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CounselingModule } from './module/counseling/counseling.module';
import { AuthModule } from './module/auth/auth.module';
import { AuthGuard } from './module/auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { PaymentModule } from './module/payment/payment.module';
import { JwtStrategy } from './module/auth/passport/auth.passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './module/payment/output/entities/Payment';



// Module 설명 : express에서는 router위주의 설계였다면, nest에서는 module위주의 설계를 한다
// 기능별로 module을 만들어서 여기에 다 넣어줄거임 - nest가 module간의 연결된걸 파악해서 한번에 실행해줌
// app.module.ts가 중심이 되는 모듈이기 때문에, 다른 기능별 모듈을 연결시켜야 함
@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'skl035512!',
    database: 'animalNest',
    entities: [Payment],
    synchronize: false, // 엔티티와 데이터베이스 테이블을 자동으로 동기화할지 여부 지정(개발모드에서만 true여야함)
  }), 
  TypeOrmModule.forFeature([Payment]),
  CounselingModule,
  AuthModule,
  PaymentModule,
  ],
  controllers: [AppController], // 실제 라우터 
   providers: [
     AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard, // AuthGuard 를 전역 Guard 로 선언
    // },
    // JwtStrategy, // JwtStrategy를 providers 배열에 추가
   ],
})
export class AppModule {}
