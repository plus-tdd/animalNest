import { PaymentInfo } from "./PaymentDatabase";

export interface PaymentRepository {
    savePaymentInfo(paymentInfo: PaymentInfo): Promise<void>;
  }

  export class TestPaymentRepository implements PaymentRepository {
    private paymentInfos: PaymentInfo[] = [];
  
    async savePaymentInfo(paymentInfo: PaymentInfo): Promise<void> {
      this.paymentInfos.push(paymentInfo);
    }
  
    getPaymentInfos(): PaymentInfo[] {
      return this.paymentInfos;
    }
  }
  
  
  export class MysqlPaymentRepository implements PaymentRepository {
    async savePaymentInfo(paymentInfo: PaymentInfo): Promise<void> {
      // 데이터베이스에 결제 정보를 저장하는 로직 구현
      // 예: database.save(paymentInfo);
    }
  }