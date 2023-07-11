import { Test, TestingModule } from '@nestjs/testing';
import { CounselingController } from '../../module/counseling/api/counseling.controller';

describe('CounselingController', () => {
  let controller: CounselingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CounselingController],
    }).compile();

    controller = module.get<CounselingController>(CounselingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
