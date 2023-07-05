import { Module } from '@nestjs/common';
import { CounselingController } from './api/counseling.controller';
import { CounselingService } from './domain/counseling.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CounselingRepositoryImpl } from './data/counseling.db';
import { CounselingEntity } from './data/counseling.entity';
import { COUNSELING_REPOSITORY } from './domain/counseling.repository';
import { PetEntity } from '../value-data/pet.db';
import { DoctorEntity } from '../value-data/doctor.db';
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([PetEntity, CounselingEntity, DoctorEntity]),
  ],
  providers: [
    {
      provide: COUNSELING_REPOSITORY,
      useClass: CounselingRepositoryImpl,
    },
    CounselingService,
  ],
  controllers: [CounselingController],
  exports: [
    {
      provide: COUNSELING_REPOSITORY,
      useClass: CounselingRepositoryImpl,
    },
  ],
})
export class CounselingModule {}
