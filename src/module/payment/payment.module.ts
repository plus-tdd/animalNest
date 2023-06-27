import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './paymentService';
import { TestPaymentRepository } from './payment.repository'; // PaymentRepository import 추가
import { JwtStrategy } from '../auth/passport/auth.passport';


@Module({
  controllers: [PaymentController],
  providers: [PaymentService, TestPaymentRepository, JwtStrategy]
})
export class PaymentModule {}
