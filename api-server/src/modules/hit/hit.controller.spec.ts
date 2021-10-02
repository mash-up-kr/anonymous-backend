import { Test, TestingModule } from '@nestjs/testing';
import { HitController } from './hit.controller';

describe('HitController', () => {
  let controller: HitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HitController],
    }).compile();

    controller = module.get<HitController>(HitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
