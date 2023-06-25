import { CardCompany } from "./model";

export interface PaymentInfo {
    id: number;
    cardNum: number;
    endDate: string;
    cvc: number;
    cardCompany: CardCompany.Kookmin
    amount: number;
    // ...기타 필요한 결제 정보 컬럼들...
  }
  
  export class PaymentDatabase {
    private paymentInfos: PaymentInfo[] = [];
  
    public savePaymentInfo(paymentInfo: PaymentInfo): void {
      this.paymentInfos.push(paymentInfo);
    }
  
    public getPaymentInfos(): PaymentInfo[] {
      return this.paymentInfos;
    }
  }