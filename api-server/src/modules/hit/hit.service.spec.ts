import { Test, TestingModule } from '@nestjs/testing';
import { HitService } from './hit.service';

describe('HitService', () => {
  let service: HitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HitService],
    }).compile();

    service = module.get<HitService>(HitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
