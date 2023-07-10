import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateCounselingDto } from './api/counseling.dto';
import { CounselingEntity } from './data/counseling.entity';
import { Counseling, CounselingInfo } from './domain/counseling.model'

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

  mapDtoToDomain(createCounselingDto : CreateCounselingDto) : CounselingInfo{
    return {
      userId: createCounselingDto.userId,
      petId: createCounselingDto.petId,
      doctorId: createCounselingDto.doctorId, 
      dateTime: createCounselingDto.counselingDateTime,
      expense: createCounselingDto.expense,
      content: createCounselingDto.content    
}
  }
}
