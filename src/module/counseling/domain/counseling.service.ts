import { Inject, Injectable } from '@nestjs/common';
import { Counseling, CounselingInfo } from './counseling.model';
import {
  COUNSELING_REPOSITORY,
  CounselingRepository,
} from './counseling.repository';
import { InvalidCounselingInfoError } from '../counseling.error';

// Mapper 가 위치해야하는 곳
// Controller 에서 Service 를 호출하기 전에 DTO -> Domain / 호출 후에 Domain -> DTO ( 필요할 수도 아닐 수도 )
// Repository 에서 Domain 으로 받은걸 Entity 로 만들어야 할 때 / Entity 결과를 Domain 으로 내보내야 할 때

@Injectable()
export class CounselingService {
  constructor(
    // 야 내가 상담내역이 필요하니까 니가 DB 랑 지지고 볶든 외부 API 랑 지지고 볶든 알아서 가져와 임마
    @Inject(COUNSELING_REPOSITORY)
    private readonly repository: CounselingRepository,
  ) {}

  //예약 등록
  async registerCounseling(info: CounselingInfo): Promise<Counseling> {
    this.validateRequestInfo(info);
    const result = await this.repository.registerCounselingHistory(info);
    // 서비스에서 nest.js 에 의존성을 물고 있는 오류가 있을까 ?
    // 유저 검증이라던가 ( Guards {} => Jwt.=> UserEntity )
    // 얘가 뭔가에 의존적으로 개발되었다면 우리가 모듈이나 모노레포란 개념으로 아키텍쳐를 나눔.
    // 이게 의미가 있는가 ?
    return result;
  }

  //예약 및 진료 내역 조회
  async getCounselingHistories(
    startDate: Date,
    endDate: Date,
  ): Promise<Counseling[]> {
    return [];
  }

  //진료 상세 조회
  async getCounseling(counselingId: string): Promise<Counseling[]> {
    return [];
  }

  //진료 상태 변경 (예약->진료)
  async updateCounselingStatus(
    counselingId: string,
    content: string,
  ): Promise<Counseling[]> {
    return [];
  }

  //예약 삭제
  async deleteCounseling(counselingId: string): Promise<Counseling[]> {
    return [];
  }

  private validateRequestInfo(info: CounselingInfo) {
    const { dateTime, expense, content } = info;
    // DB를 찔러서 검증해야하는 것 : doctor, pet 의 존재여부
    // Repository ( DB 전문가 ) 한테 위임
    // 1. 등록날짜는 현재 시각보단 크면 안됨
    if (dateTime.getTime() > Date.now())
      throw new InvalidCounselingInfoError('날짜');
    // 2. 컨텐츠는 1000자 이내여야 함.
    if (content.length > 1000) throw new InvalidCounselingInfoError('상담내용');
    // 3. 비용은 양수여야 함.
    if (expense <= 0) throw new InvalidCounselingInfoError('비용');
  }
}
