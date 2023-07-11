import { CounselingService } from '../../module/counseling/domain/counseling.service';
import { CounselingRepository } from 'src/module/counseling/domain/counseling.repository';
import {
  Counseling,
  CounselingCreateInfo,
  CounselingUpdateInfo,
  CounselingStatus,
} from 'src/module/counseling/domain/counseling.model';

// 서비스 : 순수한 비즈니스 로직 덩어리 ( nest.js 랑도 상관없고 db 랑도 상관없음. )
// 소프트웨어 개발 => Front/ Back => 5년이 채 안됨
// UIComponent 에서 서비스를 호출한다 = Frontend
// Controller ( Api Route ) 에서 서비스를 호출한다 = Backend
// -> 그래서 서비스 UnitTest 에 대해서는 nestjs/testing 의 TestingModule 을 사용하지 않는 게 더 좋은 구조라고 생각함. - by 허재
class TestCounselingRepository implements CounselingRepository {
  async registerCounselingHistory(
    info: CounselingCreateInfo,
  ): Promise<Counseling> {
    return {
      id: 1,
      hospitalName: '어쩌라고',
      doctorName: '의사',
      userName: '박세진',
      petName: '시고르잡종',
      dateTime: new Date(),
      status: CounselingStatus.Complete,
      expense: 10000,
      content: '우아 !',
    };
  }
  async getCounselingHistories(
    startDate: Date,
    endDate: Date,
  ): Promise<Counseling[]> {
    return [
      // 가짜 Counseling 오브젝트 리스트
    ];
  }

  getOneCounseling(counselingId: string): Promise<Counseling> {
    throw new Error('Method not implemented.');
  }

  updateCounselingStatusDone(
    upateInfo: CounselingUpdateInfo,
  ): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  deleteOneCounseling(counselingId: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
/*
  버거킹 햄버거를 먹는다. 라는 요구사항이 내려왔음.
  => 버거킹 햄버거를 가져온다. + 햄버거를 먹는다.
  => (추상화)
  => 햄버거를 가져온다. -> 버거킹햄버거를 가져온다. ( Repository )
  => 햄버거를 먹는다 ( 햄버거를 가져온다 ) ( Service )
  => (이게 왜 변경에 용이한데 ? 어쩌라고 ?)
  => 햄버거를 가져온다. -> 맥도날드 치즈버거를 가져온다.
  => 햄버거를 먹는다 ( 햄버거를 가져온다 ) 
  => 손쉽게 우리는 버거킹이 아닌 맥도날드 치즈버거를 먹는다. 달성 !
*/

// 그러면 TestingModule 은 언제 쓰나요 ?
// 통합테스트 ( 컨트롤러 테스트 할 떄 ) - 아래처럼 실제와 동일하게 주입하는 구조로 의존성 주입할 때 쓰는게 제일 낫다고 생각합니다!
// provider = [CounselingController, CounselingService, CounselingRepositoryImpl]
// jest.mockImplementation()
// jest.spyOn()
// TestModule ( => @nestjs/jest )
// 갑자기 요구사항이 express 로 바꿔야함. 그럼 이 서비스는 ? 다시 짜야되네요 ? => 클린한 코드 x
// 클린코드 / 리팩토링하기좋은 코드 = 변경에 유연한 코드.

// 갑자기 동일한 요구사항인데, 이 요구사항을 React ( Frontend ) 에서 처리해줘 !
// React -> useEffect () => 얘를 호출하게 하면 됨 . 왜 ? Service 는 어디에도 의존적이지 않으니까

// 의존성이 분리 안된 상태 x => service 에서 의존 : TypeOrm.Repository<Entity> => MySql 에서 PostGreSql 로 바꾸랬는데, PostGre 에서는 지원안하는 칼럼이 있음
// 그럼 어떻게 해야함 ? 서비스도, Entity 도 다바꿔야됨

// Service = Domain 모델, Repository 인터페이스를 이용 => Repository 가 분리되어있음 ?
// React 가 필요함. 별도 모듈로 따서 이 서비스 이용하면 됨
//
// 클린코드 / 아키텍쳐 : 개발자로서 우리가 영원히 살아남으려면 이런 구조화를 잘해야된다.
//
// PostGreRepository implements Repository {
// }

describe('CounselingService', () => {
  let service: CounselingService;

  beforeEach(async () => {
    const repository: CounselingRepository = new TestCounselingRepository();
    service = new CounselingService(repository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('성공 했어요!', async () => {
    const successfulInfo: CounselingCreateInfo = {
      doctorId: 0,
      userId: 0,
      petId: 0,
      dateTime: new Date('2023-06-27'),
    };
    const resultCounsel = await service.registerCounseling(successfulInfo);
    expect(resultCounsel).not.toBeNull();
    console.log(resultCounsel);
    expect(resultCounsel.expense).toEqual(10000);
  });

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
