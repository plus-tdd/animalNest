import { Injectable } from '@nestjs/common';
import { CreateCounselingDto } from './dto/create-counseling.dto';
import { Counseling } from './counseling.entity';
import { CounselingRepositoryImpl } from './counseling.repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CounselingMapper } from './counseling.mapper';

@Injectable()
export class CounselingService {
  constructor(
    @InjectRepository(Counseling)
    private counselingRepository: Repository<Counseling>,
    private readonly couselingMapper: CounselingMapper,
  ) {}

  async getAll(): Promise<Counseling[]> {
    return;
  }

  async getOne(id: number): Promise<Counseling> {
    return;
  }

  async create(counselingData: CreateCounselingDto): Promise<boolean> {
    const counseling: Counseling =
      this.couselingMapper.mapToEntity(counselingData);

    const { userId, petId, counselingDateTime, content, expense } =
      counselingData;

    if (userId === undefined || userId < 1) {
      return false;
    }

    const createResult = await this.counselingRepository.save(counseling);

    return true;
  }

  async deleteOne(id: number): Promise<boolean> {
    return true;
  }

  async update(id: number, updateData): Promise<boolean> {
    return true;
  }
}
