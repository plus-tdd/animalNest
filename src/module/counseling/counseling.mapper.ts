import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateCounselingDto } from './api/counseling.dto';
import { CounselingEntity } from './data/counseling.entity';
import { Counseling } from './domain/counseling.model';

@Injectable()
export class CounselingMapper {
  mapToEntity(counseling: Counseling): CounselingEntity {
    return plainToClass(CounselingEntity, counseling);
  }

  mapToDto(counseling: Counseling): CreateCounselingDto {
    return plainToClass(CreateCounselingDto, counseling);
  }
}
