import { Body, Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { PaymentService } from '../domain/payment.service';
import { PaymentInfo, PaymentInfoForRefund } from '../domain/payment.model';
import { ApiOperation } from '@nestjs/swagger';
import { PaymentRequestDto } from './payment.save.request.dto';
import { RefundPaymentRequestDto } from './payment.refund.request.dto';
import { Payment } from '../domain/payment.model';
import { RefundPaymentInfo } from '../domain/payment.model';
import { JwtAuthGuard } from "../../auth/auth.jwtAuthGuard";
import Logger from 'src/logger';
@UseGuards(JwtAuthGuard)
@Controller('/payment')
export class PaymentController {

    private logger;

    constructor(private readonly paymentService: PaymentService) {
             this.logger = new Logger('PaymentController')
    }

    @ApiOperation({summary : '결제하기'})
    @Post()
    async makePayment(@Body() paymentData: PaymentRequestDto): Promise<Payment> {
        const { userId, cardNum, endDate, cvc, cardCompany, price } = paymentData;

        // dto - > model
        const paymentInfo: PaymentInfo = {
            userId: userId,
            cardNum: cardNum,
            endDate: endDate,
            cvc: cvc,
            cardCompany: cardCompany,
            price: price
        }

        this.logger.info('request userId', paymentData.userId)
        this.logger.info('request cardCompany',paymentData.cardCompany)
        this.logger.info('request cardNum',paymentData.cardNum)
        this.logger.info('request endDate',paymentData.endDate)
        this.logger.info('request cvc',paymentData.cvc)
        this.logger.info('request price',paymentData.price)

        return await this.paymentService.makePayment(paymentInfo)
    }

    @ApiOperation({summary : '유저별 결제 목록 조회하기(환불된 것 제외)'})
    @Get(':userId')
    async getPaymenList(@Param('userId') userId: number): Promise<Payment[]> {

        this.logger.info('request userId', userId)
        return await this.paymentService.getPaymenList(userId)
    }


    @ApiOperation({summary : '결제 취소하기'})
    @Post('/refund')
    refundPayment(@Body() refundData: RefundPaymentRequestDto): Promise<PaymentInfoForRefund> {
        const { paymentId, userId} = refundData;

        this.logger.info('request userId', refundData.userId)
        this.logger.info('request paymentId',refundData.paymentId)
        // dto - > model
        const refundInfo: RefundPaymentInfo = {
            paymentId: paymentId,
            userId: userId   
        }
        return this.paymentService.refundPayment(refundInfo)
    }
}
