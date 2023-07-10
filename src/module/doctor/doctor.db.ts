import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { DoctorMapper } from "./doctor.mapper";
import { DoctorRepository } from "./docter.repository";
import { DoctorEntity } from "./doctor.entity";
import { DoctorOutPutDto } from "./doctor.output.dto";
import { Doctor } from "./doctor.model";
import { FactoryValue } from "nestjs-seeder";

@Injectable()
export class DoctorRepositoryImpl implements DoctorRepository {
    constructor(
      // DB 주입
      @InjectRepository(DoctorEntity)
      private DoctorDB: Repository<DoctorEntity>,
    ) {
        this.mapper = new DoctorMapper();
    }

    private mapper : DoctorMapper;

    async findOneDoctorById(doctorId: number) : Promise<DoctorOutPutDto> {
        const result = await this.DoctorDB.findOne({ where: { id: doctorId } });
        return this.mapper.mapToDto(result);
    }


    async createMany(doctor) : Promise<boolean> {
        try {
            await this.DoctorDB.insert(doctor)
            return true;
        } catch {
            return false;
        }
    }
    async deleteAll(): Promise<boolean> {
        try {
            await this.DoctorDB.clear()
            return true;
        } catch {
            return false;
        }
    }
}