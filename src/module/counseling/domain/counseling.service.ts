import { Inject, Injectable } from '@nestjs/common';
import { Counseling, CounselingInfo } from './counseling.model';
import { CounselingRepository } from './counseling.repository';
import { InvalidCounselingInfoError } from '../counseling.error';
import { CounselingRepositoryImpl } from '../data/counseling.db';

// Mapper 가 위치해야하는 곳
// Controller 에서 Service 를 호출하기 전에 DTO -> Domain / 호출 후에 Domain -> DTO ( 필요할 수도 아닐 수도 )
// Repository 에서 Domain 으로 받은걸 Entity 로 만들어야 할 때 / Entity 결과를 Domain 으로 내보내야 할 때

@Injectable()
export class CounselingService {
  constructor(
    private readonly repository: CounselingRepository,
  ) {}
  
  async registerCounseling(info: CounselingInfo): Promise<Counseling> {
    this.validateRequestInfo(info)
    const result = await this.repository.registerCounselingHistory(info)
    return result
  }

  private validateRequestInfo(info: CounselingInfo) {
    const { dateTime, expense, content } = info
    // DB를 찔러서 검증해야하는 것 : doctor, pet 의 존재여부
    // Repository ( DB 전문가 ) 한테 위임
    // 1. 등록날짜는 현재 시각보단 크면 안됨
    if (dateTime.getTime() > Date.now()) throw new InvalidCounselingInfoError("날짜")
    // 2. 컨텐츠는 1000자 이내여야 함.
    if (content.length > 1000) throw new InvalidCounselingInfoError("상담내용")
    // 3. 비용은 양수여야 함.
    if (expense <= 0) throw new InvalidCounselingInfoError("비용")
  }

  async getCounselingHistories(startDate: Date, endDate: Date): Promise<Counseling[]> {
    return []
  }

}