import { Module } from '@nestjs/common';
import { PaymentController } from './api/payment.controller';
import { TestPaymentRepository } from './domain/payment.repository'; // PaymentRepository import 추가
//import { JwtStrategy } from '../auth/passport/auth.passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from './data/payment.entity';
import { PaymentService } from './domain/payment.service';
import { PaymentRepositoryImpl } from './data/payment.db';
import { AlarmService, AlarmServiceImpl } from '../alarm/alarm.service';
import { AlarmModule } from '../alarm/alarm.module';
import { AuthModule } from '../auth/auth.module';
import { UserEntity } from '../user/data/user.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([PaymentEntity, UserEntity]), // PaymentEntityRepository 등록
    AlarmModule
  ],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    {
      provide: 'PaymentRepository',
      useClass: PaymentRepositoryImpl,
    },
    {
      provide: 'AlarmService',
      useClass: AlarmServiceImpl,
    },
  ],
  exports: [
    {
      provide: 'PaymentRepository',
      useClass: PaymentRepositoryImpl,
    },
    {
      provide: 'AlarmService',
      useClass: AlarmServiceImpl,
    },
  ],
})
export class PaymentModule {}
