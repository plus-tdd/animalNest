import { PaymentInfo,PaymentInfoForRefund } from "./domain/payment.model";

//외부 SDK를 가정한 모의 객체(Mock Object)
export interface ExternalPaymentSDK {
     makePayment(requestInfo: PaymentInfo): Promise<string>,
     refundPayment(requestInfo: PaymentInfo): Promise<string>
  }


  export class TestExternalPaymentSDK implements ExternalPaymentSDK {
    public async makePayment(requestInfo: PaymentInfo):  Promise<string> {
      // 외부 SDK에 결제 요청을 보내고 결과를 받아온다고 가정
      const result: PaymentInfo = { ...requestInfo };
      
      try {
        return '결제 요청 성공';
      } catch (error) {
        // 결제 요청이 실패한 경우 에러를 던져서 상위 코드에서 처리하도록 합니다.
       // throw new Error('결제 요청 실패');
       return '결제 요청 실패'
      }
    }
  


    public async refundPayment(requestInfo: PaymentInfoForRefund):  Promise<string> {
      // 외부 SDK에 결제 요청을 보내고 결과를 받아온다고 가정
      const result: PaymentInfoForRefund = { ...requestInfo };
      
      try {
        return '결제 취소 요청 성공';
      } catch (error) {
        // 결제 요청이 실패한 경우 에러를 던져서 상위 코드에서 처리하도록 합니다.
       // throw new Error('결제 요청 실패');
       return '결제 취소 요청 실패'
      }
    }
  }
  

// 실제 외부 SDK 클래스
export class ActualExternalPaymentSDK implements ExternalPaymentSDK {
    public async makePayment(requestInfo: PaymentInfo): Promise<string> {
      // 외부 SDK에 결제 요청을 보내고 결과를 받아온다고 가정
      const result = requestInfo; // 외부 SDK의 결제 결과
  
      try {
        return '결제 요청 성공';
      } catch (e) {
        throw new Error('결제 요청 실패');
      }
    }

        public async refundPayment(requestInfo: PaymentInfo):  Promise<string> {
      // 외부 SDK에 결제 요청을 보내고 결과를 받아온다고 가정
      const result: PaymentInfo = { ...requestInfo };
      
      try {
        return '결제 취소 요청 성공';
      } catch (error) {
        // 결제 요청이 실패한 경우 에러를 던져서 상위 코드에서 처리하도록 합니다.
       // throw new Error('결제 요청 실패');
       return '결제 취소 요청 실패'
      }
    }
  }
