import { Injectable } from '@nestjs/common';
import { PaymentRepository } from "../domain/payment.repository";
import { CardCompany, RefundPaymentInfo, PaymentInfoForRefund } from "../domain/payment.model";
import { PaymentInfo, Payment } from "../domain/payment.model";
import { PaymentEntity } from "./payment.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InvalidPaymentInfoError } from "../payment.error";
import { UserEntity } from 'src/module/user/data/user.entity';
import Logger from 'src/logger';

// 실제 DB
@Injectable()
export class PaymentRepositoryImpl implements PaymentRepository {

    private logger;

    constructor(
        // DB 주입
        @InjectRepository(PaymentEntity)
        private PaymentDB: Repository<PaymentEntity>,
        @InjectRepository(UserEntity)
        private UserDB: Repository<UserEntity>
    ){
        this.logger = new Logger('PaymentRepositoryImpl')
    }

    async savePayment(paymentInfo: PaymentInfo): Promise<Payment> {
        try {
          // user가 db에 존재하는지??
          const user = await this.UserDB.findOne({
            where: { id: paymentInfo.userId },
          });
          if (user === null) {
            this.logger.error('savePayment', `유저를 찾을 수 없습니다. savePayment request's userId: ${paymentInfo.userId}`);
            throw new InvalidPaymentInfoError('유저');
          }
      
          // model -> entitiy
          const entity = this.PaymentDB.create({
            User: user,
            cardNum: paymentInfo.cardNum,
            endDate: paymentInfo.endDate,
            cvc: paymentInfo.cvc,
            cardCompany: paymentInfo.cardCompany,
            price: paymentInfo.price,
          });
      
          try {
            await this.PaymentDB.save(entity);
            // 로그 추가
            this.logger.info('savePayment', `새로운 결제 정보가 저장되었습니다. PAYMENT_ID: ${entity.id}, ACCOUNT: ${entity.User.account}`);
      
            // 반환값 
            return {
              paymentId: entity.id,
              userId: entity.User.id,
              cardNum: entity.cardNum,
              endDate: entity.endDate,
              cvc: entity.cvc,
              cardCompany: paymentInfo.cardCompany,
              price: entity.price,
            };
          } catch (error) {
            this.logger.error('savePayment', `결제 정보 저장 중 오류가 발생하였습니다: ${error.message}`);
            throw error; // 예외를 다시 던져서 호출한 쪽에서 처리할 수 있도록 함
          }
      
        } catch (error) {
          // UserDB에서 예외 처리
          this.logger.error('savePayment', `유저 정보 조회 중 오류가 발생하였습니다: ${error.message}`);
          throw error; // 예외를 다시 던져서 호출한 쪽에서 처리할 수 있도록 함
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
            userId: payment.User.id,
            cardNum: payment.cardNum,
            endDate: payment.endDate,
            cvc: payment.cvc,
            cardCompany: payment.cardCompany,
            price: payment.price,
          };

        return refundPaymentDomain;

    }

    async findUserPhoneNumber(userId: number): Promise<string> {
        // user가 db에 존재하는지??
        const user = await this.UserDB.findOne({
            where: { id: userId },
        });

        if (user === null) throw new InvalidPaymentInfoError('유저');

        return user.phoneNumber;
    }
}