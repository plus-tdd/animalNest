import { Module } from '@nestjs/common';
import { CounselingController } from './counseling.controller';
import { CounselingService } from './counseling.service';

@Module({
  controllers: [CounselingController],
  providers: [CounselingService],
})
export class CounselingModule {}
