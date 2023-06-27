
import { Injectable } from "@nestjs/common";
import { TestExternalPaymentSDK } from "./externalPaymentSDK";
import { PaymentCardRequestInfo } from "./model";
import { PaymentInfo } from "./paymentDatabase";
import { TestPaymentRepository } from "./payment.repository";
import { Payment } from "./output/entities/Payment";
//TypeORM에서 제공하는 Repository 클래스를 import하여 데이터베이스 작업에 사용. 이를 통해 Entity와 상호작용할 수 있다
import { Repository } from 'typeorm'; 
// NestJS에서 TypeORM 리포지토리를 주입하기 위해 @InjectRepository() 데코레이터를 사용한다.
// 이를 통해 PaymentService 클래스의 생성자에서 Payment 엔티티에 대한 리포지토리를 주입받을 수 있다.
import { InjectRepository } from "@nestjs/typeorm"; // InjectRepository 추가
import { PaymentRequestDto } from "./dto/payment.request.dto";

@Injectable() // 비즈니스 로직으로 분리 
export class PaymentService {

   constructor (
        @InjectRepository(Payment) // InjectRepository를 사용하여 주입
        private paymentRepository: Repository<Payment>) {}


    async getHello() {
        return "hello~~~~~";
    }


    // // 서비스단에서 만든 결제 요청 정보 검증 함수, 실제 결제 함수를 각각 합쳐서 컨트롤러단에서 같이 사용하면 될까여?
    // constructor(paymentRepository: TestPaymentRepository) {
    //   this.paymentRepository = paymentRepository;
    // }

    // 1. 실행 함수 - 결제 정보 검증 함수
public async validatePaymentInfo(requestInfo: PaymentCardRequestInfo): Promise<boolean> {
        const { cardNum, endDate, cvc, cardCompany } = requestInfo;
        
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
    public async savePaymentInfo(paymentInfo: PaymentRequestDto): Promise<boolean> {
    
        const test = this.paymentRepository.save(paymentInfo);
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
