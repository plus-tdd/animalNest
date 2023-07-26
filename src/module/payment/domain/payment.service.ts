import { Inject, Injectable } from '@nestjs/common';
import { AlarmService } from 'src/module/alarm/alarm.service';
import { TestExternalPaymentSDK } from './payment.external.sdk';
import {
  PaymentInfo,
  Payment,
  RefundPaymentInfo,
  PaymentInfoForRefund,
} from './payment.model';
import { PaymentRepository } from './payment.repository';
import { AlarmData } from 'src/module/alarm/alarm.service';
import Logger from 'src/logger';
import { InvalidPaymentInfoException } from '../payment.error';

@Injectable() // 비즈니스 로직으로 분리
export class PaymentService {

  private logger;
  
  constructor(
    @Inject('PaymentRepository')
    private readonly repository: PaymentRepository,
    @Inject('AlarmService')
    private readonly alarmService: AlarmService,
  ) {
    this.logger = new Logger('PaymentService')
  }

  public async makePayment(paymentInfo: PaymentInfo): Promise<Payment> {
    this.validatePaymentInfo(paymentInfo);
    // DB작업 - 결제 정보 저장
    const savePaymentInfo = await this.repository.savePayment(paymentInfo);

    // 결제 SDK 기능
    await this.paymentToSdk(paymentInfo);

    // 결제 완료 알람 붙여야함

    const userPhoneNumber = await this.repository.findUserPhoneNumber(
      paymentInfo.userId,
    );
    const message = '결제가 완료되었습니다';

    const alarmData: AlarmData = {
      recipient: userPhoneNumber,
      message: message,
    };

    this.alarmService.sendAlarm(alarmData);

    return savePaymentInfo;
  }

  public async refundPayment(
    refundInfo: RefundPaymentInfo,
  ): Promise<PaymentInfoForRefund> {
    // DB작업 - 소프트 딜리트 : 논리적으로는 결제 취소, 물리적으로는 칼럼에 삭제됐다는 것을 update
    const savePaymentInfo = await this.repository.refundPayment(refundInfo);

    // 결제 취소 SDK 기능
    this.paymentToSdkForRefund(savePaymentInfo);

    // 결제 취소 알람 붙여야함
    const userPhoneNumber = await this.repository.findUserPhoneNumber(
      refundInfo.userId,
    );

    const message = '결제가 취소되었습니다';

    const alarmData: AlarmData = {
      recipient: userPhoneNumber,
      message: message,
    };

    this.alarmService.sendAlarm(alarmData);
    return savePaymentInfo;
  }

  // 결제 정보 검증 함수
  public async validatePaymentInfo(requestInfo: PaymentInfo): Promise<boolean> {
    const { userId, cardNum, endDate, cvc, cardCompany, price } = requestInfo;

    try {
    if (cardNum !== undefined) {
      if (!this.validateCardNum(cardNum)) {
        this.logger.error('validateCardNum', `cardNum을 확인하세요 ${cardNum}`)
        throw new InvalidPaymentInfoException('카드번호');
      }
    }
  } catch (error) {
    this.logger.error('validateCardNum', `카드번호 검증 중 오류가 발생하였습니다: ${error.message}`);
    throw error; // 예외를 다시 던져서 호출한 쪽에서 처리할 수 있도록 함
  }

    if (!this.validateInfoIsEmpty(requestInfo)) {
      this.logger.error('validateInfoIsEmpty', `requestInfo를 확인하세요 ${requestInfo}`)
      throw new InvalidPaymentInfoException('요청겂');
    }

    return true;
  }

  // 외부 SDK에 결제 요청 전달
  public async paymentToSdk(requestInfo: PaymentInfo): Promise<string> {
    const externalSDK = new TestExternalPaymentSDK(); // 인스턴스 생성
    const paymentResult = await externalSDK.makePayment(requestInfo); // 인스턴스의 메서드 호출
    return paymentResult;
  }

  // 결제 취소 SDK 연결
  public async paymentToSdkForRefund(
    requestInfo: PaymentInfoForRefund,
  ): Promise<string> {
    const externalSDK = new TestExternalPaymentSDK(); // 인스턴스 생성
    const paymentResult = await externalSDK.refundPayment(requestInfo); // 인스턴스의 메서드 호출
    return paymentResult;
  }

  // 결제 저장 함수
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
    if (cardNum < 0 || cardNumString.length > 16 ||cardNumString.length < 16 ) {
      this.logger.error('validateCardNum', `cardNum이 0보다 작거나 16보다 길고, 짧으면 안됩니다 ${cardNum}`)
      return false;
    }
    return true;
  }

  // 카드 정보 요청값에 누락락된게 있는지 검증
  private validateInfoIsEmpty(requestInfo: PaymentInfo): boolean {
    const { cardNum, endDate, cvc, cardCompany } = requestInfo;
    if (cardNum === undefined || endDate === undefined || cvc === undefined) {
      this.logger.error('validateInfoIsEmpty', `requestInfo 중 빈 값이 존재하면 안됩니다. ${requestInfo}`)
      return false;
    }
    return true;
  }
}
