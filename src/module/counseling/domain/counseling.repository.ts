import { Counseling, CounselingInfo } from './counseling.model';

//기본은 interface로 만들고 이걸 implements해서 실제로 구현?하는 식
/*
  스펙
  - 진료내역 저장
  - 5년 이하 것만 조회되어야 함.
*/
export const COUNSELING_REPOSITORY = 'Counseling Repository';

export interface CounselingRepository {
  // 진료내역을 저장하고, 성공했는지 반환함
  registerCounselingHistory(info: CounselingInfo): Promise<Counseling>;
  // start ~ end 사이의 히스토리를 반환함
  getConselingHistories(startDate: Date, endDate: Date): Promise<Counseling[]>;
  //예약이나 진료 하나를 반환함
  getOneCounseling(counselingId: string): Promise<Counseling>;
  //예약이 진료로 상태 변경되고 변경된 후를 반환함
  updateCounselingStatusDone(
    counselingId: string,
    content: string,
    expense : number
  ): Promise<boolean>;
  //예약이 삭제되고 성공여부를 반환함
  deleteOneCounseling(counselingId: string): Promise<boolean>;
}
