import { Module } from '@nestjs/common';
import { CounselingController } from './api/counseling.controller';
import { CounselingService } from './domain/counseling.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CounselingRepositoryImpl } from './data/counseling.db';
import { CounselingEntity } from './data/counseling.entity';
import { COUNSELING_REPOSITORY } from './domain/counseling.repository';
import { AuthModule } from '../auth/auth.module';
import { DoctorEntity } from '../doctor/data/doctor.entity';
import { PetEntity } from '../pet/data/pet.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      PetEntity,
      CounselingEntity,
      DoctorEntity,
      DoctorEntity,
    ]),
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
