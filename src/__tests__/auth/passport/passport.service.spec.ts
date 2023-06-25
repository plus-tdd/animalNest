import { Test, TestingModule } from '@nestjs/testing';
import { PassportService } from '../../../auth/passport/passport.service';

describe('PassportService', () => {
  let service: PassportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PassportService],
    }).compile();

    service = module.get<PassportService>(PassportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
