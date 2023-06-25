import { CounselingEntity } from './counseling.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//기본은 interface로 만들고 이걸 implements해서 실제로 구현?하는 식
export interface CounselingRepository {
  saveCounselingInfo(info: CounselingEntity): Promise<boolean>;
}

//Injectable이 이걸 다른곳에 주입할수있단건가, 여기에 주입이 가능하단건가
@Injectable()
export class CounselingDBRepository implements CounselingRepository {
  constructor(
    @InjectRepository(CounselingEntity) //이거도 일단 뭔지 모르겠음.
    private CounselingRepository: Repository<CounselingEntity>,
  ) {}

  //상담 내역 저장
  async saveCounselingInfo(info: CounselingEntity): Promise<boolean> {
    return;
  }
}
