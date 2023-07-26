import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { AuthOutPutDto } from './domain/auth.output.dto';
import { UserEntity } from '../user/data/user.entity';

@Injectable()
export class AuthMapper {
  mapToEntity(dto: AuthOutPutDto): UserEntity {
    return plainToClass(UserEntity, dto);
  }

  mapToDto(entity: UserEntity): AuthOutPutDto {
    return plainToClass(AuthOutPutDto, entity);
  }
}
