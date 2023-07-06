import { Injectable } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { DoctorOutPutDto } from "./doctor.output.dto";
import { DoctorEntity } from "./doctor.entity";
import { Doctor } from "./doctor.model";

@Injectable()
export class DoctorMapper {
    mapToEntity(doctor: Doctor): DoctorEntity {
        return plainToClass(DoctorEntity, doctor);
    }

    mapToDto(entity: DoctorEntity): DoctorOutPutDto {
        return plainToClass(DoctorOutPutDto, entity);
    }
}
