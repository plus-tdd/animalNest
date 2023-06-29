import { Module } from '@nestjs/common';

export type PaymentCardRequestInfo = {
        cardNum?: number
        endDate: string // yymm
        cvc?: number
        cardCompany: CardCompany
        price : number
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


export type PaymentInfo = {
    userId : number
    cardNum?: number
    endDate: string // yymm
    cvc?: number
    cardCompany: CardCompany
    price : number
}