import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentInfo } from './paymentDatabase';
import { ApiOperation } from '@nestjs/swagger'; 
import { PaymentRequestDto } from './dto/payment.request.dto';

//@UseGuards(AuthGuard)
@Controller('api/payment')
export class PaymentController {

    constructor(private readonly paymentService: PaymentService) {

    }

    @ApiOperation({summary : '결제하기'})
    @Post()
    makePayment(@Body() paymentInfo: PaymentRequestDto) {
        return this.paymentService.makePayment(paymentInfo)
    }

}
