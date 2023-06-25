import { Test, TestingModule } from '@nestjs/testing';
import { CounselingService } from '../../counseling/counseling.service';

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
});
