import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UserOutPutDto } from "./user.output.dto";
import { User } from "./user.entity";


@Injectable()
export class UserMapper {
    mapToEntity(dto: UserOutPutDto): User {
        return plainToClass(User, dto);
    }

    mapToDto(entity: User): UserOutPutDto {
        return plainToClass(UserOutPutDto, entity);
    }
}