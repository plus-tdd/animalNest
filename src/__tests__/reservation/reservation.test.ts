import {ReservationService, } from "../../reservation/reservationService"
import {ReservationPetInfo, ReservationInfo} from "../../reservation/model"

const reservationPetInfo : ReservationPetInfo = {
    
    petType: choosePet('dog'),// Dog or Cat
    name: '초코',
    birthDay: '2022.12.20',
    weight: 10,
    breed: '잡종',
    gender: 'Male', // Male or Female
    neuter: 'n',// 중성화 yes or no 
    allergy: '없음', // 입력이 되지 않아도 문제 없도록 추후 변경
    disease: '무', // 입력이 되지 않아도 문제 없도록 추후 변경
    isAvailable: ;
}



const reservationInfo: ReservationInfo ={
    petId: number; // Dog or Cat
    userId: number;
    day: string;
    time: string;
    isAvailable: boolean;
}



describe(' 예약등록 TestSuite', () => {
    let reservationService: ReservationService

    // 매 테스트 시작 전에 도는 함수
    beforeAll(() => {
        const reservationRepository = new TestReservationRepository()
        reservationService = new ReservationService(reservationRepository)
    })


    })
