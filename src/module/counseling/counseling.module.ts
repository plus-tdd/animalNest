import { Module } from '@nestjs/common';
import { CounselingController } from './api/counseling.controller';
import { CounselingService } from './domain/counseling.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CounselingEntity } from './data/counseling.entity';
import { CounselingMapper } from './counseling.mapper';
import { CounselingRepositoryImpl } from './data/counseling.db';
import { CounselingRepository } from './domain/counseling.repository';
import { PetModule } from '../pet/pet.module';
@Module({
  imports: [TypeOrmModule.forFeature([CounselingEntity]), PetModule],
  controllers: [CounselingController],
  providers: [
    CounselingService,
    { provide: 'CounselingRepository', useClass: CounselingRepositoryImpl },
  ],
})
export class CounselingModule {}
