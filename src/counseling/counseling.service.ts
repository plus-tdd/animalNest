import { Injectable } from '@nestjs/common';
import { CounselingDto } from './counseling.dto';

@Injectable()
export class CounselingService {
  public async createCounseling(requestInfo: CounselingDto): Promise<boolean> {
    const { userId, counselingDateTime } = requestInfo;

    return;
  }
}
