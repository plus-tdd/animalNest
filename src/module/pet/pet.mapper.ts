import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PetOutPutDto } from './domain/pet.output.dto';
import { PetEntity } from './data/pet.entity';

@Injectable()
export class PetMapper {
  mapToEntity(dto: PetOutPutDto): PetEntity {
    return plainToClass(PetEntity, dto);
  }

  mapToDto(entity: PetEntity): PetOutPutDto {
    return plainToClass(PetOutPutDto, entity);
  }
}
