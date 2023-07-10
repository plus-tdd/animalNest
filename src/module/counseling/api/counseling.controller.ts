import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  Put,
  Body,
  Query, UseGuards
} from "@nestjs/common";
import { CounselingService } from '../domain/counseling.service';
import { CreateCounselingDto } from './counseling.dto';
import { CounselingInfo } from '../domain/counseling.model';
import { JwtAuthGuard } from "../../auth/auth.jwtAuthGuard";
import { CounselingMapper} from "./../counseling.mapper"

@Controller('counseling')
export class CounselingController {
  constructor(private readonly counselingService: CounselingService) {
    this.mapper = new CounselingMapper;
  }

  private mapper : CounselingMapper;

  //진료 등록 (예약)
  @UseGuards(JwtAuthGuard)
  @Post()
  registerCounseling(@Body() counselingData: CreateCounselingDto) {

    const counselingInfo = this.mapper.mapDtoToDomain(counselingData)

    return this.counselingService.registerCounseling(counselingInfo);
  }

  //진료 내역 조회
  @UseGuards(JwtAuthGuard)
  @Get('')
  getCounselingHistories(
    @Query('start') startDate: Date,
    @Query('end') endDate: Date,
  ) {
    return this.counselingService.getCounselingHistories(startDate, endDate);
  }

  //진료 상세 조회
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getCounseling(@Param('id') counselingId: string) {
    return this.counselingService.getCounseling(counselingId);
  }

  //진료 상태 변경 (예약->진료)
  @UseGuards(JwtAuthGuard)
  @Post(':id')
  updateCounselingStatus(
    @Param('id') counselingId: string,
    @Body('content') content: string, @Body('expense') expense: number,
  ) {
    return this.counselingService.updateCounselingStatusDone(counselingId, content, expense);
  }

  //예약 삭제
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteCounseling(@Param('id') counselingId: string) {
    return this.counselingService.deleteCounseling(counselingId);
  }
}
