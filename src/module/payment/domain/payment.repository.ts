import { PaymentInfo, Payment } from "./payment.model";
import { CardCompany } from "./payment.model";
import { RefundPaymentInfo, PaymentInfoForRefund } from "./payment.model";


export interface PaymentRepository {
    savePayment(paymentInfo: PaymentInfo): Promise<Payment>
    refundPayment(paymentInfo: RefundPaymentInfo): Promise<PaymentInfoForRefund>
    findUserPhoneNumber(userId: number): Promise<string>
  }

// 테스트용
export class TestPaymentRepository implements PaymentRepository {
  private paymentInfos: PaymentInfo[] = [];

  async savePayment(paymentInfo: PaymentInfo): Promise<Payment> {
    this.paymentInfos.push(paymentInfo);


    return {
      paymentId: 1,
      userId : 1,
      cardNum: 1234567812345678,
      endDate: '2412',
      cvc: 123,
      cardCompany: CardCompany.Hyundai,
      price : 10000
    }
  }

  async refundPayment(paymentInfo: RefundPaymentInfo): Promise<PaymentInfoForRefund> {

    return {
      userId : 1,
      cardNum: 1234567812345678,
      endDate: '2412',
      cvc: 123,
      cardCompany: CardCompany.Hyundai,
      price : 10000
    }
  }

  async findUserPhoneNumber(userId: number): Promise<string> {
    return '12341234';
  }
}
