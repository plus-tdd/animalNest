import { Module } from '@nestjs/common';
import { CounselingController } from './api/counseling.controller';
import { CounselingService } from './domain/counseling.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Counseling } from './domain/counseling.model';
import { CounselingMapper } from './counseling.mapper';
import { CounselingRepositoryImpl } from './data/counseling.db';
@Module({
  imports: [TypeOrmModule.forFeature([Counseling])],
  controllers: [CounselingController],
  providers: [CounselingService, CounselingRepositoryImpl],
  exports: [CounselingController],
})
export class CounselingModule {}
