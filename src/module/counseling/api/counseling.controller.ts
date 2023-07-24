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
  UseFilters,
  HttpException,
} from '@nestjs/common';
import { CounselingService } from '../domain/counseling.service';
import { CreateCounselingDto, UpdateCounselingDto } from './counseling.dto';
import { JwtAuthGuard } from '../../auth/auth.jwtAuthGuard';
import { CounselingMapper } from './../counseling.mapper';
import { ApiOperation } from '@nestjs/swagger';
import {
  InvalidCounselingInfoError,
  counselingDataBaseError,
} from './../counseling.error';
import { HttpExceptionFilter } from './../../../http-exception.filter';
import { Response } from './../../../response';

@Controller('counseling')
export class CounselingController {
  private response: Response;
  constructor(private readonly counselingService: CounselingService) {
    this.mapper = new CounselingMapper();
    this.response = new Response();
  }

  private mapper: CounselingMapper;

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '진료 예약' })
  @Post()
  async registerCounseling(@Body() counselingData: CreateCounselingDto) {
    try {
      const counselingInfo = this.mapper.mapCreateDtoToDomain(counselingData);
      const result = await this.counselingService.registerCounseling(
        counselingInfo,
      );
      return this.response.success(result);
    } catch (error) {
      throw error;
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

    let result: boolean;
    try {
      result = await this.counselingService.updateCounselingStatusDone(
        updateInfo,
      );
    } catch (error) {
      if (error instanceof InvalidCounselingInfoError) {
        return error.message;
      } else if (error instanceof counselingDataBaseError) {
        return error.message;
      } else {
        return '진료 정보 수정에 실패하였습니다';
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '예약 취소' })
  @Delete(':id')
  async deleteCounseling(@Param('id') counselingId: string) {
    return await this.counselingService.deleteCounseling(counselingId);
  }
}
