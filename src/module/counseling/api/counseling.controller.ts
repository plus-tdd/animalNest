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

@Controller('counseling')
export class CounselingController {
  constructor(private readonly counselingService: CounselingService) {}

  //진료 등록 (예약)
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

  //진료 내역 조회
  @Get('')
  getCounselingHistories(
    @Query('start') startDate: Date,
    @Query('end') endDate: Date,
  ) {
    return this.counselingService.getCounselingHistories(startDate, endDate);
  }

  //진료 상세 조회
  @Get(':id')
  getCounseling(@Param('id') counselingId: string) {
    return this.counselingService.getCounseling(counselingId);
  }

  //진료 상태 변경 (예약->진료)
  @Post(':id')
  updateCounselingStatus(@Param('id') counselingId: string) {
    return this.counselingService.updateCounselingStatus(counselingId);
  }

  //예약 삭제
  @Delete(':id')
  deleteCounseling(@Param('id') counselingId: string) {
    return this.counselingService.deleteCounseling(counselingId);
  }
}
