import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateCounselingDto } from './api/counseling.dto';
import { CounselingEntity } from './data/counseling.entity';
<<<<<<< HEAD
import { Counseling } from './domain/counseling.model'

@Injectable()
export class CounselingMapper {
  mapDomainToEntity(counseling: Counseling): CounselingEntity {
    return plainToClass(CounselingEntity, counseling);
  }

  mapEntityToDomain(counselingEntity : CounselingEntity) : Counseling{
    return 
  }

  mapDomainToDto(counseling: Counseling): CreateCounselingDto {
    return plainToClass(CreateCounselingDto, counseling);
  }

  mapDtoToDomain(createCounselingDto : CreateCounselingDto) : Counseling{
    return 
=======
import { Counseling } from './domain/counseling.model';

@Injectable()
export class CounselingMapper {
  mapToEntity(counseling: Counseling): CounselingEntity {
    return plainToClass(CounselingEntity, counseling);
  }

  mapToDto(counseling: Counseling): CreateCounselingDto {
    return plainToClass(CreateCounselingDto, counseling);
>>>>>>> 13dd456298f7e2e18680b24efce33f3b958e7a5e
  }
}
