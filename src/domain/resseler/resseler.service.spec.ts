import { Test, TestingModule } from '@nestjs/testing';
import { ResselerService } from './resseler.service';

describe('ResselerService', () => {
  let service: ResselerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResselerService],
    }).compile();

    service = module.get<ResselerService>(ResselerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
