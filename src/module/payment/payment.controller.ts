import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { AuthGuard } from '../auth/auth.guard';
import { PaymentInfo } from './paymentDatabase';
import { ApiOperation } from '@nestjs/swagger'; 
import { PaymentRequestDto } from './dto/payment.request.dto';

//@UseGuards(AuthGuard)
@Controller('api/payment')
export class PaymentController {

    constructor(private readonly paymentService: PaymentService) {

    }

    @Get()
    getHello() {
        return this.paymentService.getHello();
    }

    @ApiOperation({summary : '결제정보 저장'})
    @Post()
    savePaymentInfo(@Body() paymentInfo: PaymentRequestDto) {
        return this.paymentService.savePaymentInfo(paymentInfo)
    }

}
