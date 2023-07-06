import { Inject, Injectable } from "@nestjs/common";
import { DataFactory, FactoryValue, Seeder } from "nestjs-seeder";
import { DoctorRepositoryImpl } from "./doctor.db";
import { DoctorEntity } from "./doctor.entity";
import { Doctor } from "./doctor.model";
import { DOCTOR_REPOSITORY, DoctorRepository } from "./docter.repository";

@Injectable()
export class DoctorSeeder implements Seeder {
    constructor(
      @Inject(DOCTOR_REPOSITORY)
      private readonly doctorRepository : DoctorRepository
    ) {}

    seed(): Promise<any> {
        const doctors = DataFactory.createForClass(DoctorEntity).generate(10);

        return this.doctorRepository.createMany(doctors);
    }
    drop(): Promise<any> {
        return this.doctorRepository.deleteAll();
    }
}