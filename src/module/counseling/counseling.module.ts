import { Module } from '@nestjs/common';
import { CounselingController } from './counseling.controller';
import { CounselingService } from './counseling.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Counseling } from './counseling.entity';
import { CounselingMapper } from './counseling.mapper';
@Module({
  imports: [TypeOrmModule.forFeature([Counseling])],
  controllers: [CounselingController],
  providers: [CounselingService, CounselingMapper],
})
export class CounselingModule {}
