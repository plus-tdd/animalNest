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
import { CreateCounselingDto, UpdateCounselingDto } from './counseling.dto';
import { JwtAuthGuard } from '../../auth/auth.jwtAuthGuard';
import { CounselingMapper } from './../counseling.mapper';
import { ApiOperation } from '@nestjs/swagger';

@Controller('counseling')
export class CounselingController {
  constructor(private readonly counselingService: CounselingService) {
    this.mapper = new CounselingMapper();
  }

  private mapper: CounselingMapper;

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '진료 예약' })
  @Post()
  async registerCounseling(@Body() counselingData: CreateCounselingDto) {
    try {
      const counselingInfo = this.mapper.mapCreateDtoToDomain(counselingData);
      return await this.counselingService.registerCounseling(counselingInfo);
    } catch (error) {
      return { message: error.message };
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '기간 내 진료 내역 조회' })
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

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '진료 상세 조회' })
  @Get(':id')
  async getCounseling(@Param('id') counselingId: string) {
    const result = await this.counselingService.getCounseling(counselingId);

    const response = this.mapper.mapDomainToDto(result);
    console.log(response);
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '진료 기록 업데이트' })
  @Patch(':id')
  async updateCounselingStatus(
    @Param('id') counselingId: string,
    @Body('content') content: string,
    @Body('expense') expense: number,
  ) {
    const updateCounselingDto: UpdateCounselingDto = {
      counselingId: +counselingId,
      content: content,
      expense: expense,
    };

    const updateInfo = this.mapper.mapUpdateDtoToDomain(updateCounselingDto);

    return await this.counselingService.updateCounselingStatusDone(updateInfo);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '예약 취소' })
  @Delete(':id')
  async deleteCounseling(@Param('id') counselingId: string) {
    return await this.counselingService.deleteCounseling(counselingId);
  }
}
