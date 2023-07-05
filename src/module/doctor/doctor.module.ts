import { Module } from '@nestjs/common';
import { DOCTOR_REPOSITORY } from "./docter.repository";
import { DoctorRepositoryImpl } from "./doctor.db";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DoctorEntity } from "./doctor.entity";
import { DoctorService } from './doctor.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([DoctorEntity])
    ],
    providers: [
        {
            provide : DOCTOR_REPOSITORY,
            useClass : DoctorRepositoryImpl
        },
        DoctorService
    ],
    exports: [
        {
            provide : DOCTOR_REPOSITORY,
            useClass : DoctorRepositoryImpl
        }
    ],
})
export class DoctorModule {}
