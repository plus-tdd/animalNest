import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { DoctorOutPutDto } from './domain/doctor.output.dto';
import { DoctorEntity } from './data/doctor.entity';
import { Doctor } from './domain/doctor.model';

@Injectable()
export class DoctorMapper {
  mapToEntity(doctor: Doctor): DoctorEntity {
    return plainToClass(DoctorEntity, doctor);
  }

  mapToDto(entity: DoctorEntity): DoctorOutPutDto {
    return plainToClass(DoctorOutPutDto, entity);
  }
}
