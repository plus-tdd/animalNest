import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateCounselingDto } from './api/counseling.dto';
import { Counseling } from './domain/counseling.model';

@Injectable()
export class CounselingMapper {
  mapToEntity(dto: CreateCounselingDto): Counseling {
    return plainToClass(Counseling, dto);
  }

  mapToDto(entity: Counseling): CreateCounselingDto {
    return plainToClass(CreateCounselingDto, entity);
  }
}
