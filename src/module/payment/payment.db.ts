import { Injectable } from "@nestjs/common";
import { PaymentRepository } from "./payment.repository";
import { CardCompany, PaymentCardRequestInfo } from "./payment.model";
import { PaymentInfo } from "./payment.model";
import { PaymentEntity } from "./output/entities/payment.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// 실제 DB
@Injectable()
export class PaymentRepositoryImpl implements PaymentRepository {

    constructor(
        // DB 주입
        @InjectRepository(PaymentEntity)
        private PaymentDB: Repository<PaymentEntity>
    ){}

    async savePayment(paymentInfo: PaymentInfo): Promise<PaymentInfo> {
            
        const paymentEntity = new PaymentEntity();
      //  paymentEntity.
        await this.PaymentDB.save(paymentEntity);

        return {
            userId : 1,
            cardNum: 1234567812345678,
            endDate: '2412',
            cvc: 123,
            cardCompany: CardCompany.Hyundai,
            price : 10000
        }
    }

    async refundPayment(paymentInfo: PaymentInfo): Promise<PaymentInfo> {
        return
    }
}