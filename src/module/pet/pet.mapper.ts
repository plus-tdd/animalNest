import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PetOutPutDto } from './domain/pet.output.dto';
import { Pet } from './data/pet.entity';

@Injectable()
export class PetMapper {
  mapToEntity(dto: PetOutPutDto): Pet {
    return plainToClass(Pet, dto);
  }

  mapToDto(entity: Pet): PetOutPutDto {
    return plainToClass(PetOutPutDto, entity);
  }
}
