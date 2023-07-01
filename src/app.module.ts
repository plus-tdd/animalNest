import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CounselingModule } from './module/counseling/counseling.module';
import { AuthModule } from './module/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { PaymentModule } from './module/payment/payment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Counseling } from './module/counseling/domain/counseling.model';
import { AuthController } from './module/auth/auth.controller';
import { UserService } from './module/user/domain/user.service';
import { UserModule } from './module/user/user.module';
import { PetModule } from './module/pet/pet.module';
import { PetService } from './module/pet/domain/pet.service';
import { Pet } from './module/pet/data/pet.entity';
import { User } from './module/user/data/user.entity';
import { CounselingEntity } from './module/counseling/data/counseling.entity';
import { CounselingService } from './module/counseling/domain/counseling.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import { PaymentEntity } from './module/payment/data/payment.entity';
import { PaymentService } from './module/payment/domain/payment.service';
import { AlarmModule } from './module/alarm/alarm.module';
import { AlarmServiceImpl } from './module/alarm/alarm.service';

// Module 설명 : express에서는 router위주의 설계였다면, nest에서는 module위주의 설계를 한다
// 기능별로 module을 만들어서 여기에 다 넣어줄거임 - nest가 module간의 연결된걸 파악해서 한번에 실행해줌
// app.module.ts가 중심이 되는 모듈이기 때문에, 다른 기능별 모듈을 연결시켜야 함
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './.env' }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PW,
      database: process.env.DB_SCHEMA,
      synchronize: true,
      dropSchema: true,
      entities: [CounselingEntity, Pet, User, PaymentEntity],
    }),
    TypeOrmModule.forFeature([CounselingEntity]),
    CounselingModule,
    // AuthModule,
    PaymentModule,
    UserModule,
    PetModule,
    JwtModule,
    AlarmModule,
  ],
  controllers: [AppController],
  providers: [
    
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard, // AuthGuard 를 전역 Guard 로 선언
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard, // AuthGuard 를 전역 Guard 로 선언
    // },
    UserService,
    PetService,
    CounselingService,
    PaymentService,
    AlarmServiceImpl
  ],
  // {
  //   provide: APP_GUARD,
  //   useClass: AuthGuard, // AuthGuard 를 전역 Guard 로 선언
  // },
  // JwtStrategy, // JwtStrategy를 providers 배열에 추가
})
export class AppModule {}
