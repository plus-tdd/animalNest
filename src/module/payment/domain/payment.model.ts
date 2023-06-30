import { Module } from '@nestjs/common';


export type PaymentInfo = {
    userId : number
    cardNum?: number
    endDate: string // yymm
    cvc?: number
    cardCompany: CardCompany
    price : number
}

export type RefundPaymentInfo = {
    paymentId: number
    userId : number
}

export type PaymentInfoForRefund = {
    userId : number
    cardNum?: number
    endDate: string // yymm
    cvc?: number
    cardCompany: string
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

export type Payment = {
    paymentId: number
    userId : number
    cardNum?: number
    endDate: string // yymm
    cvc?: number
    cardCompany: string
    price : number
}