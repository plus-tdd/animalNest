import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PetOutPutDto } from './pet.output.dto';
import { Pet } from './pet.entity';

@Injectable()
export class PetMapper {
  mapToEntity(dto: PetOutPutDto): Pet {
    return plainToClass(Pet, dto);
  }

  mapToDto(entity: Pet): PetOutPutDto {
    return plainToClass(PetOutPutDto, entity);
  }
}
