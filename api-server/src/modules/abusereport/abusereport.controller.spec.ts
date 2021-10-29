import { Test, TestingModule } from '@nestjs/testing';
import { AbusereportController } from './abusereport.controller';

describe('AbusereportController', () => {
  let controller: AbusereportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AbusereportController],
    }).compile();

    controller = module.get<AbusereportController>(AbusereportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
