import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  Put,
  Body,
} from '@nestjs/common';
import { CounselingService } from './counseling.service';
import { CreateCounselingDto } from './dto/create-counseling.dto';

@Controller('counseling')
export class CounselingController {
  constructor(private readonly counselingService: CounselingService) {}

  @Get()
  getAll() {
    return this.counselingService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') counselingId: number) {
    return this.counselingService.getOne(counselingId);
  }

  @Post()
  create(@Body() counselingData: CreateCounselingDto) {
    return this.counselingService.create(counselingData);
  }

  @Delete(':id')
  remove(@Param('id') counselingId: number) {
    return this.counselingService.deleteOne(counselingId);
  }

  @Patch(':id')
  patch(@Param('id') counselingId: number, @Body() updateData) {
    return this.counselingService.update(counselingId, updateData);
  }
}
