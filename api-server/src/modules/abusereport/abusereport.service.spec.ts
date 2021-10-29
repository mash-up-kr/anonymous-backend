import { Test, TestingModule } from '@nestjs/testing';
import { AbusereportService } from './abusereport.service';

describe('AbusereportService', () => {
  let service: AbusereportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AbusereportService],
    }).compile();

    service = module.get<AbusereportService>(AbusereportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
