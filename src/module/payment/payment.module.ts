import { Module } from '@nestjs/common';
import { PaymentController } from './api/payment.controller';
import { TestPaymentRepository } from './domain/payment.repository'; // PaymentRepository import 추가
//import { JwtStrategy } from '../auth/passport/auth.passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from './data/payment.entity';
import { PaymentService } from './domain/payment.service';
import { PaymentRepositoryImpl } from './data/payment.db';
import { AlarmService, AlarmServiceImpl } from '../alarm/alarmService';
import { AlarmModule } from '../alarm/alarm.module';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentEntity]),AlarmModule],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    {
      provide: 'PaymentService',
      useClass: PaymentRepositoryImpl,
    },
    {
      provide: 'PaymentService',
      useClass: AlarmServiceImpl,
    },
  ],
  exports: [
    {
      provide: 'PaymentService',
      useClass: PaymentRepositoryImpl,
    },
    {
      provide: 'PaymentService',
      useClass: AlarmServiceImpl,
    },
  ],
})
export class PaymentModule {}
