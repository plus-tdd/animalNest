import { PaymentCardRequestInfo } from "./model";

// 외부 SDK를 가정한 모의 객체(Mock Object)
export interface ExternalPaymentSDK {
     makePayment(requestInfo: PaymentCardRequestInfo): Promise<PaymentCardRequestInfo>
  }


  export class TestExternalPaymentSDK implements ExternalPaymentSDK {
    public async makePayment(requestInfo: PaymentCardRequestInfo): Promise<PaymentCardRequestInfo> {
      // 외부 SDK에 결제 요청을 보내고 결과를 받아온다고 가정
      const result: PaymentCardRequestInfo = { ...requestInfo };
  
      return Promise.resolve(result);
    }
  }
  

// 실제 외부 SDK 클래스
export class ActualExternalPaymentSDK implements ExternalPaymentSDK {
    public async makePayment(requestInfo: PaymentCardRequestInfo): Promise<PaymentCardRequestInfo> {
      // 외부 SDK에 결제 요청을 보내고 결과를 받아온다고 가정
      const result = requestInfo; // 외부 SDK의 결제 결과
  
      return result;
    }
  }
