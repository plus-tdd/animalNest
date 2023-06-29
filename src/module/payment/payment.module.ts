import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { TestPaymentRepository } from './payment.repository'; // PaymentRepository import 추가
//import { JwtStrategy } from '../auth/passport/auth.passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from './output/entities/payment.entity';
import { PaymentService } from './payment.service';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentEntity])],
  controllers: [PaymentController],
  providers: [PaymentService]
})
export class PaymentModule {}
