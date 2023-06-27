import { Test, TestingModule } from '@nestjs/testing';
import { CounselingService } from '../../module/counseling/counseling.service';
import { CreateCounselingDto } from '../../module/counseling/dto/create-counseling.dto';

describe('CounselingService', () => {
  let service: CounselingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CounselingService],
    }).compile();
    service = module.get<CounselingService>(CounselingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('배열을 반환해야함', async () => {
      const result = await service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {});

  describe('create', () => {
    it('userId가 정의되지 않으면 false를 리턴해야 함', async () => {
      const userIdIsUndefined: CreateCounselingDto = {
        userId: undefined,
        petId: 1,
        counselingDateTime: new Date('2023-06-25 15:30:00'),
        content: '알레르기',
        expense: 50000,
      };

      const undefinedUserIdResult = await service.create(userIdIsUndefined);
      expect(undefinedUserIdResult).toEqual(false);
    });

    it('userId는 양수가 아니면 false를 리턴해야 함', async () => {
      const userIdIsMinus: CreateCounselingDto = {
        userId: -4,
        petId: 1,
        counselingDateTime: new Date('2023-06-25 15:30:00'),
        content: '영양실조',
        expense: 50000,
      };

      const minusUserIdResult = await service.create(userIdIsMinus);
      expect(minusUserIdResult).toEqual(false);
    });

    it('진료 내역의 갯수가 1증가해야 함', async () => {
      const beforeLength = (await service.getAll()).length;
      const createData: CreateCounselingDto = {
        userId: 4,
        petId: 1,
        counselingDateTime: new Date('2023-06-25 15:30:00'),
        content: '영양실조',
        expense: 50000,
      };
      const createResult = await service.create(createData);
      const afterLength = (await service.getAll()).length;

      expect(afterLength - beforeLength).toEqual(1);
    });
  });

  describe('deleteOne', () => {});

  describe('update', () => {});
});
