import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { AuthGuard } from '../auth/auth.guard';
import { PaymentInfo } from './paymentDatabase';

//@UseGuards(AuthGuard)
@Controller('api/payment')
export class PaymentController {

    constructor(private readonly paymentService: PaymentService) {

    }

    @Get()
    getHello() {
        return this.paymentService.getHello();
    }

    @Post()
    savePaymentInfo(@Body() paymentInfo: PaymentInfo) {
        return this.paymentService.savePaymentInfo(paymentInfo)
    }

}
