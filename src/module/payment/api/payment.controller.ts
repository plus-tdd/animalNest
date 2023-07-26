import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PaymentService } from '../domain/payment.service';
import { PaymentInfo,PaymentInfoForRefund } from '../domain/payment.model';
import { ApiOperation } from '@nestjs/swagger'; 
import { PaymentRequestDto } from './payment.save.request.dto';
import { RefundPaymentRequestDto } from './payment.refund.request.dto';
import { Payment } from '../domain/payment.model';
import { RefundPaymentInfo } from '../domain/payment.model';
import { JwtAuthGuard } from "../../auth/auth.jwtAuthGuard";

//@UseGuards(AuthGuard)
@Controller('/payment')
export class PaymentController {

    constructor(private readonly paymentService: PaymentService) {

    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary : '결제하기'})
    @Post()
    makePayment(@Body() paymentData: PaymentRequestDto): Promise<Payment> {
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
        
        return this.paymentService.makePayment(paymentInfo)
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary : '결제 취소하기'})
    @Post('/refund')
    refundPayment(@Body() refundData: RefundPaymentRequestDto): Promise<PaymentInfoForRefund> {
        const { paymentId, userId} = refundData;

        // dto - > model
        const refundInfo: RefundPaymentInfo = {
            paymentId: paymentId,
            userId: userId   
        }
        return this.paymentService.refundPayment(refundInfo)
    }

}
