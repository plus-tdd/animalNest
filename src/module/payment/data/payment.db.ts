import { Injectable } from "@nestjs/common";
import { PaymentRepository } from "../domain/payment.repository";
import { CardCompany, RefundPaymentInfo, PaymentInfoForRefund } from "../domain/payment.model";
import { PaymentInfo, Payment } from "../domain/payment.model";
import { PaymentEntity } from "./payment.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InvalidPaymentInfoError } from "../payment.error";
import { PaymentUserEntity } from "./payment.user.entity";

// 실제 DB
@Injectable()
export class PaymentRepositoryImpl implements PaymentRepository {

    constructor(
        // DB 주입
        @InjectRepository(PaymentEntity)
        private PaymentDB: Repository<PaymentEntity>,
        private UserDB: Repository<PaymentUserEntity>
    ){}

    async savePayment(paymentInfo: PaymentInfo): Promise<Payment> {
           
        // user가 db에 존재하는지??
        const user = await this.UserDB.findOne({
            where: { id: paymentInfo.userId },
        });
        if (user === null) throw new InvalidPaymentInfoError('유저');


        // model -> entitiy
        const entity = this.PaymentDB.create({
            userId: user.id,
            cardNum: paymentInfo.cardNum,
            endDate: paymentInfo.endDate,
            cvc: paymentInfo.cvc,
            cardCompany: paymentInfo.cardCompany,
            price: paymentInfo.price
          });
        
        await this.PaymentDB.save(entity);

        // entity -> model 로는 안바뀌도 되나오..?mapper를 못쓴다던 이유가 있었는데..

        return {
            paymentId: entity.id,
            userId : entity.userId,
            cardNum: entity.cardNum,
            endDate: entity.endDate,
            cvc: entity.cvc,
            cardCompany: paymentInfo.cardCompany,
            price : entity.price
        }
    }

    async refundPayment(refundInfo: RefundPaymentInfo): Promise<PaymentInfoForRefund> {

        // 요청에 들어온 paymentId가 db에 존재하는지?
        const payment = await this.PaymentDB.findOne({
            where: { id: refundInfo.paymentId}
        });
        if (payment === null) throw new InvalidPaymentInfoError('결제 PK');

        // user가 db에 존재하는지??
        const user = await this.UserDB.findOne({
            where: { id: refundInfo.userId },
        });
        if (user === null) throw new InvalidPaymentInfoError('유저');

        // 소프트 딜리트 - 환불 처리됨
        payment.isRefund = true; // 원하는 칼럼을 true로 변경
        await this.PaymentDB.save(payment); // 변경 내용을 저장

        // entitiy -> domain
        const refundPaymentDomain: PaymentInfoForRefund = {
            userId: payment.userId,
            cardNum: payment.cardNum,
            endDate: payment.endDate,
            cvc: payment.cvc,
            cardCompany: payment.cardCompany,
            price: payment.price,
          };

        return refundPaymentDomain;

    }

    async findUserPhoneNumber(userId: number): Promise<number> {
        // user가 db에 존재하는지??
        const user = await this.UserDB.findOne({
            where: { id: userId },
        });

        if (user === null) throw new InvalidPaymentInfoError('유저');

        return user.phoneNumber;
    }
}