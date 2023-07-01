import { CounselingService } from '../../module/counseling/domain/counseling.service';
import { CounselingRepository } from 'src/module/counseling/domain/counseling.repository';
import {
  Counseling,
  CounselingInfo,
} from 'src/module/counseling/domain/counseling.model';
import { Schedule } from './../../module/value-data/schedule.db';

// 서비스 : 순수한 비즈니스 로직 덩어리 ( nest.js 랑도 상관없고 db 랑도 상관없음. )
// -> 그래서 서비스 UnitTest 에 대해서는 nestjs/testing 의 TestingModule 을 사용하지 않는 게 더 좋은 구조라고 생각함. - by 허재
class TestCounselingRepository implements CounselingRepository {
  //스케쥴을 반환
  async getSchedules(): Promise<Schedule[]> {
    return [
      {
        id: 1,
        doctorId: 1,
        scheduleTime: new Date('2023-06-30 10:00:00'),
        isReserved: false,
      },
      {
        id: 2,
        doctorId: 1,
        scheduleTime: new Date('2023-06-30 11:00:00'),
        isReserved: false,
      },
    ];
  }

  async registerCounselingHistory(info: CounselingInfo): Promise<Counseling> {
    return {
      id: 1,
      hospitalName: '병원',
      doctorName: '의사',
      userName: '박세진',
      petName: '시고르잡종',
      dateTime: new Date(),
      expense: 10000,
      content: '우아 !',
    };
  }
  async getConselingHistories(
    startDate: Date,
    endDate: Date,
  ): Promise<Counseling[]> {
    return [
      {
        id: 1,
        hospitalName: '세브란스동물',
        doctorName: '허재',
        userName: '박세진',
        petName: '시고르잡종',
        dateTime: new Date(),
        expense: 10000,
        content: '타박상',
      },
      {
        id: 2,
        hospitalName: '연세동물',
        doctorName: '김재준',
        userName: '박세진',
        petName: '시고르잡종',
        dateTime: new Date(),
        expense: 10000,
        content: '감기',
      },
    ];
  }

  async getOneCounseling(counselingId: string): Promise<Counseling> {
    return {
      id: 2,
      hospitalName: '연세동물',
      doctorName: '김재준',
      userName: '박세진',
      petName: '시고르잡종',
      dateTime: new Date(),
      expense: 10000,
      content: '감기',
    };
  }

  async deleteOneCounseling(counselingId: string): Promise<boolean> {
    return true;
  }
}
// 그러면 TestingModule 은 언제 쓰나요 ?
// 통합테스트 ( 컨트롤러 테스트 할 떄 ) - 아래처럼 실제와 동일하게 주입하는 구조로 의존성 주입할 때 쓰는게 제일 낫다고 생각합니다!
// provider = [CounselingController, CounselingService, CounselingRepositoryImpl]

describe('CounselingService', () => {
  let service: CounselingService;

  beforeEach(async () => {
    const repository: CounselingRepository = new TestCounselingRepository();
    service = new CounselingService(repository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //예약 스케쥴표 조회
  describe('getSchedules', async () => {
    it('must return Schedule', async () => {
      const result = await service.getSchedules();
      //expect(result).toBeInstanceOf(Schedule) //스케쥴이 클래스가 아니라 type이라 못씀.
    });
  });

  //진료 등록 (예약)
  describe('registerCounseling', () => {
    it('성공 했어요!', async () => {
      const successfulInfo: CounselingInfo = {
        doctorId: 0,
        userId: 0,
        petId: 0,
        dateTime: new Date('2023-06-27'),
        expense: 10000,
        content: '우아 !',
      };
      const resultCounsel = await service.registerCounseling(successfulInfo);
      expect(resultCounsel).not.toBeNull();
      console.log(resultCounsel);
      expect(resultCounsel.expense).toEqual(10000);
    });
  });

  //진료 내역 조회
  describe('getCounselingHistories', () => {
    it('', () => {});
  });

  //진료 상세 조회
  describe('getCounseling', () => {
    it('', () => {});
  });

  //진료 삭제
  describe('deleteCounseling', () => {
    it('', () => {});
  });

  //진료 유효성 검증
  describe('validateRequestInfo', () => {
    it('', () => {});
  });
});
