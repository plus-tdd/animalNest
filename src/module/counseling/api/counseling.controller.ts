import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  Put,
  Body,
  Query,
} from '@nestjs/common';
import { CounselingService } from '../domain/counseling.service';
import { CreateCounselingDto } from './counseling.dto';
import { CounselingInfo } from '../domain/counseling.model';
import { start } from 'repl';

@Controller('counseling')
export class CounselingController {
  constructor(private readonly counselingService: CounselingService) {}

  @Get()
  getCounselingHistories(
    @Query('start') startDate: Date,
    @Query('end') endDate: Date,
  ) {
    return this.counselingService.getCounselingHistories(startDate, endDate);
  }

  @Post()
  registerCounseling(@Body() counselingData: CreateCounselingDto) {
    const { userId, petId, doctorId, counselingDateTime, content, expense } =
      counselingData;

    const counselingInfo: CounselingInfo = {
      doctorId: doctorId,
      userId: userId,
      petId: petId,
      dateTime: counselingDateTime,
      expense: expense,
      content: content,
    };

    return this.counselingService.registerCounseling(counselingInfo);
  }
}
