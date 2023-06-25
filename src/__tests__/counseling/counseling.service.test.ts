import { Test, TestingModule } from '@nestjs/testing';
import { CounselingService } from '../../counseling/counseling.service';
import { CounselingDto } from '../../counseling/counseling.dto';

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

  test('로그인한 상태여야 함', () => {
    expect(userId).toBeDefined();
  });
});
