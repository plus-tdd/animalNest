import { Counseling } from './counseling.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//기본은 interface로 만들고 이걸 implements해서 실제로 구현?하는 식
export interface CounselingRepository {
  saveCounselingInfo(info: Counseling): Promise<boolean>;
}

//Injectable이 이걸 다른곳에 주입할수있단거 같음.
@Injectable()
export class CounselingDBRepository implements CounselingRepository {
  constructor(
    @InjectRepository(Counseling) //이거도 일단 뭔지 모르겠음.
    private CounselingRepository: Repository<Counseling>,
  ) {}

  //상담 내역 저장
  async saveCounselingInfo(info: Counseling): Promise<boolean> {
    return;
  }
}
