import { CounselingStatus } from '../domain/counseling.model';
import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCounselingDto {
  @ApiProperty({
    example: 1,
    description: '예약자 유저ID',
    required: true,
  })
  readonly userId: number;

  @ApiProperty({
    example: 1,
    description: '진료 받는 반려동물 ID',
    required: true,
  })
  readonly petId: number;

  @ApiProperty({
    example: 1,
    description: '진료 의사 ID',
    required: true,
  })
  readonly doctorId: number;

  @ApiProperty({
    example: '2023-07-11 10:00:00',
    description: '진료 날짜',
    required: true,
  })
  readonly counselingDateTime: Date;

  @ApiProperty({
    example: '감기',
    description: '진료 내용',
    required: false,
  })
  readonly content: string;

  @ApiProperty({
    example: 10000,
    description: '진료 비용',
    required: false,
  })
  readonly expense: number;
}

export class UpdateCounselingDto {
  @ApiProperty({
    example: 1,
    description: '진료 ID',
    required: true,
  })
  readonly counselingId: number;
  @ApiProperty({
    example: '감기',
    description: '진료 내용',
    required: true,
  })
  readonly content: string;
  @ApiProperty({
    example: 10000,
    description: '진료 비용',
    required: true,
  })
  readonly expense: number;
}

export class CounselingResponseDto {
  readonly id: number;
  @ApiProperty({
    example: '엔더슨',
    description: '고객 이름',
    required: true,
  })
  readonly userName: string;
  @ApiProperty({
    example: '밤비',
    description: '반려동물 이름',
    required: true,
  })
  readonly petName: string;
  @ApiProperty({
    example: '허준',
    description: '의사 이름',
    required: true,
  })
  readonly doctorName: string;
  @ApiProperty({
    example: '항해병원',
    description: '병원 이름',
    required: true,
  })
  readonly hospitalName: string;
  @ApiProperty({
    example: '2023-07-11 10:00:00',
    description: '진료 날짜',
    required: true,
  })
  readonly dateTime: string;
  @ApiProperty({
    example: CounselingStatus.Complete,
    description: '진료 데이터 상태',
    required: true,
  })
  readonly status: CounselingStatus;
  @ApiProperty({
    example: '감기',
    description: '진료 내용',
    required: true,
  })
  readonly content: string;
  @ApiProperty({
    example: 10000,
    description: '진료 비용',
    required: true,
  })
  readonly expense: number;
}
