import { Module } from '@nestjs/common';
import { DOCTOR_REPOSITORY } from './domain/docter.repository';
import { DoctorRepositoryImpl } from './data/doctor.db';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorEntity } from './data/doctor.entity';
import { DoctorService } from './domain/doctor.service';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorEntity])],
  providers: [
    {
      provide: DOCTOR_REPOSITORY,
      useClass: DoctorRepositoryImpl,
    },
    DoctorService,
  ],
  exports: [
    {
      provide: DOCTOR_REPOSITORY,
      useClass: DoctorRepositoryImpl,
    },
  ],
})
export class DoctorModule {}
