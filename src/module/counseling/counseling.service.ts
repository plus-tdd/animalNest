import { Injectable } from '@nestjs/common';
import { CreateCounselingDto } from './dto/create-counseling.dto';
import { Counseling } from './counseling.entity';
import { CounselingRepositoryImpl } from './counseling.repository';

@Injectable()
export class CounselingService {
  constructor(
    private readonly counselingRepository: CounselingRepositoryImpl,
  ) {}

  async getAll(): Promise<Counseling[]> {
    return;
  }

  async getOne(id: number): Promise<Counseling> {
    return;
  }

  async create(counselingData: CreateCounselingDto): Promise<boolean> {
    const { userId, petId, counselingDateTime, content, expense } =
      counselingData;

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
