import { Module } from '@nestjs/common';
import { PaymentController } from './api/payment.controller';
import { TestPaymentRepository } from './domain/payment.repository'; // PaymentRepository import 추가
//import { JwtStrategy } from '../auth/passport/auth.passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from './data/payment.entity';
import { PaymentService } from './domain/payment.service';
import { PaymentRepositoryImpl } from './data/payment.db';
import { AlarmService } from '../alarm/alarmService';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentEntity])],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    {
      provide: 'PaymentService',
      useClass: PaymentRepositoryImpl,
    },
  ],
  exports: [
    {
      provide: 'PaymentService',
      useClass: PaymentRepositoryImpl,
    },
  ],
})
export class PaymentModule {}
