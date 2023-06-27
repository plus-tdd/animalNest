import { CounselingService } from '../../module/counseling/domain/counseling.service';
import { CounselingRepository } from 'src/module/counseling/domain/counseling.repository';
import { Counseling, CounselingInfo } from 'src/module/counseling/domain/counseling.model';

// 서비스 : 순수한 비즈니스 로직 덩어리 ( nest.js 랑도 상관없고 db 랑도 상관없음. )
// -> 그래서 서비스 UnitTest 에 대해서는 nestjs/testing 의 TestingModule 을 사용하지 않는 게 더 좋은 구조라고 생각함. - by 허재
class TestCounselingRepository implements CounselingRepository {
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
      } 
  }
  async getConselingHistories(startDate: Date, endDate: Date): Promise<Counseling[]> {
      return [
          // 가짜 Counseling 오브젝트 리스트
      ]
  }
}
// 그러면 TestingModule 은 언제 쓰나요 ?
// 통합테스트 ( 컨트롤러 테스트 할 떄 ) - 아래처럼 실제와 동일하게 주입하는 구조로 의존성 주입할 때 쓰는게 제일 낫다고 생각합니다!
// provider = [CounselingController, CounselingService, CounselingRepositoryImpl]

describe('CounselingService', () => {
  let service: CounselingService;

  beforeEach(async () => {
    const repository: CounselingRepository = new TestCounselingRepository()
    service = new CounselingService(repository)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('성공 했어요!', async () => {
    const successfulInfo: CounselingInfo = {
      doctorId: 0,
      userId: 0,
      petId: 0,
      dateTime: new Date("2023-06-27"),
      expense: 10000,
      content: "우아 !",
    }
    const resultCounsel = await service.registerCounseling(successfulInfo)
    expect(resultCounsel).not.toBeNull()
    console.log(resultCounsel)
    expect(resultCounsel.expense).toEqual(10000)
  })

  // describe('getAll', () => {
  //   it('배열을 반환해야함', async () => {
  //     const result = await service.getAll();
  //     expect(result).toBeInstanceOf(Array);
  //   });
  // });

  // describe('getOne', () => {});

  // describe('create', () => {
  //   it('userId가 정의되지 않으면 false를 리턴해야 함', async () => {
  //     const userIdIsUndefined: CreateCounselingDto = {
  //       userId: undefined,
  //       petId: 1,
  //       counselingDateTime: new Date('2023-06-25 15:30:00'),
  //       content: '알레르기',
  //       expense: 50000,
  //     };

  //     const undefinedUserIdResult = await service.create(userIdIsUndefined);
  //     expect(undefinedUserIdResult).toEqual(false);
  //   });

  //   it('userId는 양수가 아니면 false를 리턴해야 함', async () => {
  //     const userIdIsMinus: CreateCounselingDto = {
  //       userId: -4,
  //       petId: 1,
  //       counselingDateTime: new Date('2023-06-25 15:30:00'),
  //       content: '영양실조',
  //       expense: 50000,
  //     };

  //     const minusUserIdResult = await service.create(userIdIsMinus);
  //     expect(minusUserIdResult).toEqual(false);
  //   });

  //   it('진료 내역의 갯수가 1증가해야 함', async () => {
  //     const beforeLength = (await service.getAll()).length;
  //     const createData: CreateCounselingDto = {
  //       userId: 4,
  //       petId: 1,
  //       counselingDateTime: new Date('2023-06-25 15:30:00'),
  //       content: '영양실조',
  //       expense: 50000,
  //     };
  //     const createResult = await service.create(createData);
  //     const afterLength = (await service.getAll()).length;

  //     expect(afterLength - beforeLength).toEqual(1);
  //   });
  // });

  // describe('deleteOne', () => {});

  // describe('update', () => {});
});
