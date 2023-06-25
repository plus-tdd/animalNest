import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CounselingModule } from './counseling/counseling.module';

@Module({
  imports: [CounselingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
