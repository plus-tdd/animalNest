import { Counseling, CounselingInfo } from './counseling.model';
import { Schedule, ScheduleEntity } from './../../value-data/schedule.db';

//기본은 interface로 만들고 이걸 implements해서 실제로 구현?하는 식
/*
  스펙
  - 진료내역 저장
  - 5년 이하 것만 조회되어야 함.
*/
export interface CounselingRepository {
  //스케쥴을 반환
  getSchedules(): Promise<Schedule[]>;

  // 진료내역을 저장하고, 성공했는지 반환함
  registerCounselingHistory(info: CounselingInfo): Promise<Counseling>;
  // start ~ end 사이의 히스토리를 반환함
  getConselingHistories(startDate: Date, endDate: Date): Promise<Counseling[]>;

  getOneCounseling(counselingId: string): Promise<Counseling>;

  deleteOneCounseling(counselingId: string): Promise<boolean>;
}
