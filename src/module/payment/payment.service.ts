
import { Injectable } from "@nestjs/common";
import { TestExternalPaymentSDK } from "./externalPaymentSDK";
import { PaymentCardRequestInfo } from "./payment.model";
import { PaymentInfo } from "./payment.model";
import { PaymentRepository, TestPaymentRepository } from "./payment.repository";
import { PaymentEntity } from "./output/entities/payment.entity";
import { PaymentRequestDto } from "./dto/payment.request.dto";


@Injectable() // 비즈니스 로직으로 분리 
export class PaymentService {
    constructor(
        private readonly repository: PaymentRepository,
      ) {}
      
      public async makePayment( paymentInfo: PaymentRequestDto) {
        
      }


    // 1. 실행 함수 - 결제 정보 검증 함수
    public async validatePaymentInfo(requestInfo: PaymentInfo): Promise<boolean> {
        const { userId, cardNum, endDate, cvc, cardCompany, price } = requestInfo;
        
        if (cardNum !== undefined) {
            if (!this.validateCardNum(cardNum)) {
                return false;
            }
        }
    
        if (!this.validateInfoIsEmpty(requestInfo)) {
            return false;
        }
    
        return true;
    }

    // 2. 실행 함수 - 외부 SDK에 결제 요청 전달
    public async paymentToSdk(requestInfo: PaymentCardRequestInfo): Promise<string> {
        const externalSDK = new TestExternalPaymentSDK(); // 인스턴스 생성
        const paymentResult = await externalSDK.makePayment(requestInfo); // 인스턴스의 메서드 호출
        return paymentResult;
    }


    // 3. 실행 함수 - 결제 저장 함수
    public async savePaymentInfo(paymentInfo: PaymentInfo): Promise<boolean> {
    
        const test = this.repository.savePayment(paymentInfo);
        console.log(test);
        return true;
    }


    ///-----------------------------------------------///
    // 카드 번호 검증
    private validateCardNum(cardNum: number): boolean {
        const cardNumString = cardNum.toString();
        
        // 카드가 음수이거나, 길이가 16자를 초과하는 경우 실패로 처리 (정책 상 16자리까지만 있음)
        if (cardNum < 0 || cardNumString.length > 16) {
            return false;
        }
        return true;
    }
    
    // 카드 정보 요청값에 누락락된게 있는지 검증
    private validateInfoIsEmpty(requestInfo: PaymentCardRequestInfo): boolean {
        const { cardNum, endDate, cvc, cardCompany } = requestInfo;
        if (cardNum === undefined || endDate === undefined || cvc === undefined) {
            return false;
    }
    return true;
    }
   
}
