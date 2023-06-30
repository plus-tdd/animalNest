import { ApiProperty} from '@nestjs/swagger'

export class RefundPaymentRequestDto {

    @ApiProperty({
        example: '1',
        description: '결제 DB에 저장된 결제 PK',
        required: true
    })
    paymentId: number;

    @ApiProperty({
        example: '1',
        description: '결제했던 유저의 pk 넘버',
        required: true
    })
    userId: number;

}