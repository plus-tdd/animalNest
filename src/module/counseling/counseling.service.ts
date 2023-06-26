import { Injectable } from '@nestjs/common';
import { CreateCounselingDto } from './dto/create-counseling.dto';
import { Counseling } from './counseling.entity';

@Injectable()
export class CounselingService {
  async getAll(): Promise<Counseling[]> {
    return;
  }

  async getOne(id: number): Promise<Counseling> {
    return;
  }

  async create(requestInfo: CreateCounselingDto): Promise<boolean> {
    const { userId, counselingDateTime } = requestInfo;

    if (userId === undefined || userId < 1) {
      return false;
    }

    return true;
  }

  async deleteOne(id: number): Promise<boolean> {
    return true;
  }

  async update(id: number, updateData): Promise<boolean> {
    return true;
  }
}
