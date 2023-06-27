import {ReservationPetInfo, ReservationInfo, PetType, Gender, Neuter} from "./model"
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, createConnection, Connection } from 'typeorm';
import * as moment from 'moment-timezone'; //npm install moment-timezone --save



type Reservation = {
  reservationId: number;
  petId: number;
  userId: number;
  day: string; // 20230627
  time: string; // 24시간 형식
};


export class ReservationService{
  test:string;
}


export class petInfo{
  ownerId: number;
  petId: number;
  petType: PetType; // Dog or Cat
  name: string;
  birthDay: string;
  adoptionDay: string;
  weight: number;
  breed: string;
  gender: Gender; // Male or Female
  neuter: Neuter; // 중성화 True or False 
  allergy: string; // 입력이 되지 않아도 문제 없도록 추후 변경
  disease: string; // 입력이 되지 않아도 문제 없도록 추후 변경

  constructor(ownerId:number, petId:number, petType:PetType, name: string, gender: Gender, neutered: Neuter, age: number, birthday: string, 
    dateOfAdoption: string, weight: number, breed: string, allergies: string = "", diseases: string = "") {
    
    this.ownerId = ownerId;
    this.petId = petId;
    this.petType =petType;
    this.name = name;
    this.birthDay = birthday;
    this.adoptionDay = dateOfAdoption;
    this.weight = weight;
    this.breed = breed;
    this.gender = gender;
    this.neuter = neutered; 
    this.allergy = allergies;
    this.disease = diseases;
    }

    // 빈 정보가 있는지 체크.
    isEmpty(): boolean {
      return !(
        this.ownerId &&
        this.petId &&
        this.petType &&
        this.name &&
        this.birthDay &&
        this.adoptionDay &&
        this.weight &&
        this.breed &&
        this.gender &&
        this.neuter // allergy 와 disease는 비워도 패스.
      );
    }
}

// 서버에서 받은 애완동물 등록 검증 
// 누락된 정보가 있거나 타입에 맞지 않은 값이 입력되었느지 확인
export function validateReservationPetInfoType(reservationPetInfo: any): reservationPetInfo is ReservationPetInfo {
  return (
      typeof reservationPetInfo.petId === 'number' &&
      Object.values(PetType).includes(reservationPetInfo.petType) &&
      typeof reservationPetInfo.name === 'string' &&
      typeof reservationPetInfo.birthDay === 'string' &&
      typeof reservationPetInfo.adoptionDay === 'string' &&
      typeof reservationPetInfo.weight === 'number' &&
      typeof reservationPetInfo.breed === 'string' &&
      Object.values(Gender).includes(reservationPetInfo.gender) &&
      Object.values(Neuter).includes(reservationPetInfo.neuter) &&
      typeof reservationPetInfo.allergy === 'string' &&
      typeof reservationPetInfo.disease === 'string'
  );
}


// 호출에 성공하면 데이터 등록
@Entity()
export class saveReservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  petId: number;

  @Column()
  userrId: number;

  @Column()
  day: string;

  @Column()
  time: string;

  @Column()
  reservationId: string;
  // Add other columns as needed
}


// 예약시간 (1시간 단위 24시간형식 예) 23, 18, 07) 및 날짜(20230626)
export function verifyReservationInfo(reservationInfo: Reservation): boolean {
  if (reservationInfo.day.length === 8) {
    return true;
  } else {
    return false;
  }

  if (reservationInfo.time.length === 2 && reservationInfo.time < '25'  && reservationInfo.time > '00') {
    return true;
  } else {
    return false;
  }
}


// 비어 있으면 날짜 시간 등록
export function makeReservation(dayTime: string): boolean{
    return ;
}

// 예약 등록완료 혹은 예약 취소완료 후 알람 모듈에서 예약등록 완료및 취소완료 알람 호출
export function callMessage(message:string): void{
  console.log("test");
}


//dP
function parseDate(dateString: string): Date {
  const year = parseInt(dateString.slice(0, 4), 10);
  const month = parseInt(dateString.slice(4, 6), 10) - 1;  // Months are 0-indexed in JS!
  const day = parseInt(dateString.slice(6, 8), 10);

  return new Date(Date.UTC(year, month, day));
}


// 당일 취소시 예약금 환불 불가 
// 1일전 취소시 예약금 환불 
// 취소 완료시 해당 데이터 삭제
export function refundReservationFee(reservationInfo:ReservationInfo){
  const krCurrentDate = moment().tz('Asia/Seoul').format('YYYY-MM-DD');


  const today = krCurrentDate.replace(/-/g, '');
  const reservationDay = reservationInfo.day;

  const todaydate  = parseDate(today)
  const reservationdate  = parseDate(reservationDay)

  const differenceInMilliseconds = reservationdate.getTime() - todaydate.getTime();
  const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

  if (differenceInDays > 1) {
    console.log("예약금 환불이 가능합니다.");
    return true;
  } else {
    console.log('예약금 환불 정책상 예약금 환불이 불가 합니다.');
    return false;
  }
}
