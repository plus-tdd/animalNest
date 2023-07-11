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
  UseGuards,
} from '@nestjs/common';
import { CounselingService } from '../domain/counseling.service';
import { CreateCounselingDto } from './counseling.dto';
import { CounselingInfo } from '../domain/counseling.model';
import { JwtAuthGuard } from '../../auth/auth.jwtAuthGuard';
import { CounselingMapper } from './../counseling.mapper';

@Controller('counseling')
export class CounselingController {
  constructor(private readonly counselingService: CounselingService) {
    this.mapper = new CounselingMapper();
  }

  private mapper: CounselingMapper;

  //진료 등록 (예약)
  @UseGuards(JwtAuthGuard)
  @Post()
  async registerCounseling(@Body() counselingData: CreateCounselingDto) {
    try {
      const counselingInfo = this.mapper.mapDtoToDomain(counselingData);
      return await this.counselingService.registerCounseling(counselingInfo);
    } catch (error) {
      return { message: error.message };
    }
  }

  //진료 내역 조회
  @UseGuards(JwtAuthGuard)
  @Get('')
  async getCounselingHistories(
    @Query('start') startDate: Date,
    @Query('end') endDate: Date,
  ) {
    const result = await this.counselingService.getCounselingHistories(
      startDate,
      endDate,
    );

    const response = result.map((v) => this.mapper.mapDomainToDto(v));
    console.log(response);
    return response;
  }

  //진료 상세 조회
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getCounseling(@Param('id') counselingId: string) {
    const result = await this.counselingService.getCounseling(counselingId);

    const response = this.mapper.mapDomainToDto(result);
    console.log(response);
    return response;
  }

  //진료 상태 변경 (예약->진료)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateCounselingStatus(
    @Param('id') counselingId: string,
    @Body('content') content: string,
    @Body('expense') expense: number,
  ) {
    return await this.counselingService.updateCounselingStatusDone(
      counselingId,
      content,
      expense,
    );
  }

  //예약 삭제
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteCounseling(@Param('id') counselingId: string) {
    return await this.counselingService.deleteCounseling(counselingId);
  }
}
