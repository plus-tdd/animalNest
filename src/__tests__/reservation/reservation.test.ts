import * as reserve from "../../reservation/reservation.service"
import {ReservationPetInfo, ReservationInfo, PetType, Gender, Neuter} from "../../reservation/model"

// Parse the JSON string to a JavaScript object
const reservationRequest:ReservationInfo = {
    "time": "13", 
    "day": "20230820",
    "petId": 1,
    "userId": 10,
    "reservationId": 1
}

const reservationRequest2:ReservationInfo = {
    "time": "13", 
    "day": "20230625",
    "petId": 1,
    "userId": 10,
    "reservationId": 1
}

const reservationPetInfo = new reserve.petInfo(1, 2, PetType.Cat, 'choco', Gender.Male, Neuter.No, 10, '20221220', '2023115', 10, '잡종')

describe(' 예약등록 TestSuite', () => {
    let reservationService: reserve.ReservationService
    let testReservationRepository

    // 매 테스트 시작 전에 도는 함수
    // beforeAll(() => {
    //     const reservationRepository = new testReservationRepository()
    //     reservationService = new ReservationService(reservationRepository)
    // })

    test('애완 동물 예약 정보 검증', () => {
        expect(reserve.validateReservationPetInfoType(reservationPetInfo)).toBe(true);
    });

    test('애완동물 정보에 빠진 것이 있나 확인', () =>{
        expect(reservationPetInfo.isEmpty()).toBe(false);
    });

    test ('예약 시간 및 날짜 검증', () => {
        expect(reserve.verifyReservationInfo(reservationRequest)).toBe(true)
    });

    test ('예약금 환불 가능여부 테스트', ()=>{
        const result = reserve.refundReservationFee(reservationRequest2)
        expect(result).toBe(false)
    })


})
