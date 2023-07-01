import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateCounselingDto } from './api/counseling.dto';
import { CounselingEntity } from './data/counseling.entity';

@Injectable()
export class CounselingMapper {
  mapToEntity(dto: CreateCounselingDto): CounselingEntity {
    return plainToClass(CounselingEntity, dto);
  }

  mapToDto(entity: CounselingEntity): CreateCounselingDto {
    return plainToClass(CreateCounselingDto, entity);
  }
}
