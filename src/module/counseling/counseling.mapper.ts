import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateCounselingDto } from './dto/create-counseling.dto';
import { Counseling } from './counseling.entity';

@Injectable()
export class CounselingMapper {
  mapToEntity(dto: CreateCounselingDto): Counseling {
    return plainToClass(Counseling, dto);
  }

  mapToDto(entity: Counseling): CreateCounselingDto {
    return plainToClass(CreateCounselingDto, entity);
  }
}
