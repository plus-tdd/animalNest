import { Test, TestingModule } from '@nestjs/testing';
import { CounselingService } from '../../counseling/counseling.service';
import { CounselingRepository } from 'src/counseling/counseling.repository';
import { CounselingDto } from '../../counseling/counseling.dto';

const validateRequest: CounselingDto = {
  userId: 123,
  counselingDateTime: new Date('2023-06-25 15:30:00'),
};

describe('CounselingService', () => {
  let service: CounselingService;
  let dto: CounselingDto;

  beforeAll(async () => {
    service = new CounselingService();
    dto = new CounselingDto();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('로그인한 상태여야 함', async () => {
    const userIdIsUndefined: CounselingDto = {
      userId: undefined,
      counselingDateTime: new Date('2023-06-25 15:30:00'),
    };

    const undefinedUserIdResult = await service.createCounseling(
      userIdIsUndefined,
    );
    expect(undefinedUserIdResult).toEqual(false);
  });
});
