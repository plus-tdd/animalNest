import { PaymentInfo } from "./payment.model";
import { CardCompany } from "./payment.model";


export interface PaymentRepository {
    savePayment(paymentInfo: PaymentInfo): Promise<PaymentInfo>
    refundPayment(paymentInfo: PaymentInfo): Promise<PaymentInfo>
  }

// 테스트용
export class TestPaymentRepository implements PaymentRepository {
  private paymentInfos: PaymentInfo[] = [];

  async savePayment(paymentInfo: PaymentInfo): Promise<PaymentInfo> {
    this.paymentInfos.push(paymentInfo);

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

    return {
      userId : 1,
      cardNum: 1234567812345678,
      endDate: '2412',
      cvc: 123,
      cardCompany: CardCompany.Hyundai,
      price : 10000
    }
  }
}
