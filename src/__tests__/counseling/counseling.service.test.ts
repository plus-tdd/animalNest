import { Test, TestingModule } from '@nestjs/testing';
import { CounselingService } from '../../module/counseling/counseling.service';
import { CounselingRepository } from 'src/module/counseling/counseling.repository';
import { CreateCounselingDto } from '../../module/counseling/dto/create-counseling.dto';

describe('CounselingService', () => {
  let service: CounselingService;

  beforeAll(async () => {
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
    test('로그인한 상태여야 함', async () => {
      const userIdIsUndefined: CreateCounselingDto = {
        userId: undefined,
        petId: 1,
        counselingDateTime: new Date('2023-06-25 15:30:00'),
        content: 'ddd',
        expense: 50000,
      };

      const undefinedUserIdResult = await service.create(userIdIsUndefined);
      expect(undefinedUserIdResult).toEqual(false);
    });

    test('userId는 양의 정수여야 함', async () => {
      const userIdIsMinus: CreateCounselingDto = {
        userId: -4,
        petId: 1,
        counselingDateTime: new Date('2023-06-25 15:30:00'),
        content: 'ddd',
        expense: 50000,
      };

      const minusUserIdResult = await service.create(userIdIsMinus);
      expect(minusUserIdResult).toEqual(false);
    });
  });

  describe('deleteOne', () => {});

  describe('update', () => {});
});
