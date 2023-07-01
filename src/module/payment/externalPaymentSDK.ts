import { PaymentCardRequestInfo } from "./model";

//외부 SDK를 가정한 모의 객체(Mock Object)
export interface ExternalPaymentSDK {
     makePayment(requestInfo: PaymentCardRequestInfo): Promise<string>
  }


  export class TestExternalPaymentSDK implements ExternalPaymentSDK {
    public async makePayment(requestInfo: PaymentCardRequestInfo):  Promise<string> {
      // 외부 SDK에 결제 요청을 보내고 결과를 받아온다고 가정
      const result: PaymentCardRequestInfo = { ...requestInfo };
      
      try {
        return '결제 요청 성공';
      } catch (error) {
        // 결제 요청이 실패한 경우 에러를 던져서 상위 코드에서 처리하도록 합니다.
       // throw new Error('결제 요청 실패');
       return '결제 요청 실패'
      }
    }
  }
  

// 실제 외부 SDK 클래스
export class ActualExternalPaymentSDK implements ExternalPaymentSDK {
    public async makePayment(requestInfo: PaymentCardRequestInfo): Promise<string> {
      // 외부 SDK에 결제 요청을 보내고 결과를 받아온다고 가정
      const result = requestInfo; // 외부 SDK의 결제 결과
  
      try {
        return '결제 요청 성공';
      } catch (e) {
        throw new Error('결제 요청 실패');
      }
    }
  }
