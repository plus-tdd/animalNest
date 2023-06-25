
import { ExternalPaymentSDK } from "./externalPaymenySDK";
import { PaymentCardRequestInfo } from "./model";
import { PaymentDatabase } from "./PaymentDatabase";
import { PaymentInfo } from "./PaymentDatabase";

export class PaymentService {

    // 서비스단에서 만든 결제 요청 정보 검증 함수, 실제 결제 함수를 각각 합쳐서 컨트롤러단에서 같이 사용하면 될까여?

    private paymentDatabase: PaymentDatabase;

    constructor(paymentDatabase: PaymentDatabase) {
      this.paymentDatabase = paymentDatabase;
    }

    // 1. 실행 함수 - 결제 정보 검증 함수
    public async validatePaymentInfo(requestInfo: PaymentCardRequestInfo): Promise<boolean> {
        const { cardNum, endDate, cvc, cardCompany } = requestInfo;
        
        if (cardNum !== undefined) {
            // 질문 사항 : 클래스 내부 함수라 자동으로 this가 붙나여? 인스턴스 멤버라서..ㅇㅅㅇ..
            this.validateCardNum(cardNum);
          }

        this.validateInfoIsEmpty(requestInfo);
        return true;
    }

    // 2. 실행 함수 - 외부 SDK에 결제 요청 전달
    public async paymentToSdk(requestInfo: PaymentCardRequestInfo): Promise<boolean> {

        const paymentResult = await ExternalPaymentSDK.makePayment(requestInfo);
        return paymentResult;
    }


    // 3. 실행 함수 - 결제 저장 함수
    public async makePayment(paymentInfo: PaymentInfo): Promise<boolean> {
    
        this.paymentDatabase.savePaymentInfo(paymentInfo);
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
        if (cardNum === undefined || endDate === null || cvc === undefined) {
            return false;
    }
    return true;
    }

    


    
}
