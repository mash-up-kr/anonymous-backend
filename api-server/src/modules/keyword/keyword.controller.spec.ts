import { Test, TestingModule } from '@nestjs/testing';
import { KeywordController } from './keyword.controller';
import { KeywordService } from './keyword.service';

describe('KeywordController', () => {
  let controller: KeywordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KeywordController],
      providers: [KeywordService],
    }).compile();

    controller = module.get<KeywordController>(KeywordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
