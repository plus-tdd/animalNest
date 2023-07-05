import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UserOutPutDto } from "./domain/user.output.dto";
import { UserEntity } from "./data/user.entity";


@Injectable()
export class UserMapper {
    mapToEntity(dto: UserOutPutDto): UserEntity {
        return plainToClass(UserEntity, dto);
    }

    mapToDto(entity: UserEntity): UserOutPutDto {
        return plainToClass(UserOutPutDto, entity);
    }
}


