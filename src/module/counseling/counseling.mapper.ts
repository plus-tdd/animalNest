import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import {
  CreateCounselingDto,
  CounselingResponseDto,
} from './api/counseling.dto';
import { CounselingEntity } from './data/counseling.entity';
import {
  Counseling,
  CounselingInfo,
  CounselingStatus,
} from './domain/counseling.model';

@Injectable()
export class CounselingMapper {
  mapDomainToEntity(CounselingInfo: CounselingInfo): CounselingEntity {
    const entity = new CounselingEntity();
    entity.userId = CounselingInfo.userId;
    entity.petId = CounselingInfo.petId;
    entity.doctorId = CounselingInfo.doctorId;
    entity.counselingDateTime = CounselingInfo.dateTime;
    entity.counselingStatus = CounselingInfo.status;
    entity.expense = CounselingInfo.expense;
    entity.content = CounselingInfo.content;

    return entity;
  }

  mapEntityToDomain(counselingEntity: CounselingEntity): Counseling {
    return {
      id: counselingEntity.id,
      userName: counselingEntity.User.userName,
      petName: counselingEntity.Pet.name,
      doctorName: counselingEntity.Doctor.name,
      hospitalName: counselingEntity.Doctor.hospital,
      dateTime: counselingEntity.counselingDateTime,
      status: counselingEntity.counselingStatus,
      expense: counselingEntity.expense,
      content: counselingEntity.content,
    };
  }

  mapDomainToDto(counseling: Counseling): CounselingResponseDto {
    //return plainToClass(CounselingResponseDto, counseling);
    return {
      id: counseling.id,
      userName: counseling.userName,
      petName: counseling.petName,
      doctorName: counseling.doctorName,
      hospitalName: counseling.hospitalName,
      dateTime: counseling.dateTime.toISOString().split('T')[0],
      status: counseling.status,
      expense: counseling.expense,
      content: counseling.content,
    };
  }

  mapDtoToDomain(createCounselingDto: CreateCounselingDto): CounselingInfo {
    return {
      userId: createCounselingDto.userId,
      petId: createCounselingDto.petId,
      doctorId: createCounselingDto.doctorId,
      dateTime: createCounselingDto.counselingDateTime,
      status: CounselingStatus.Reserved,
      expense: createCounselingDto.expense,
      content: createCounselingDto.content,
    };
  }
}
