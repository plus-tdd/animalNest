import { CardCompany } from "../payment.model";
import { ApiProperty} from '@nestjs/swagger'


export class PaymentRequestDto {

    @ApiProperty({
        example: '1',
        description: '결제할 유저의 pk 넘버',
        required: true
    })
    userId: number;

    @ApiProperty({
        example: '1234123412341234',
        description: '카드번호',
        required: true
    })
    cardNum: number;

    @ApiProperty({
        example: '2412',
        description: 'yy/mm 카드 유효기간',
        required: true
    })
    endDate: string;

    @ApiProperty({
        example: '123',
        description: '카드 뒷면 cvc 넘버',
        required: true
    })
    cvc: number;

    @ApiProperty({ example: 'kookmin', description: '카드 회사', required: true,
                   enum: CardCompany, enumName: 'CardCompany' })
    cardCompany: CardCompany.Kookmin

    @ApiProperty({
        example: '10000',
        description: '결제 금액',
        required: true
    })
    price: number;
}