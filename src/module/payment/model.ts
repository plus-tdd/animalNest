import { Module } from '@nestjs/common';

export type PaymentCardRequestInfo = {
    // class, interface, enum은 알겠는데 type은 뭔가여..?
    // export가 다른 파일에서 import하기 위해 설정해주는거라면 항상 export를 붙여야하나요?
    
        //  질문 : null 이면 안되는 경우를 테스트하기 위해 이렇게 했는데 맞나요?? 이러면 요청값에서도 Null을 허용한다는거 아닌가요?
        // cardNum: number | undefined   -->  cardNum?: number
        cardNum?: number
        endDate: string // yymm
        cvc?: number
        cardCompany: CardCompany
    }
    
    export enum CardCompany {
        Kookmin = 'kookmin',
        Shinhan = 'shinhan',
        Woori = 'woori',
        Hana = 'hana',
        Samsung = 'samsung',
        Lotte = 'lotte',
        Hyundai = 'hyundai',
        Nonghyup = 'nonghyup'
    }