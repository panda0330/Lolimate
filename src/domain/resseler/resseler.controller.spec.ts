import { Test, TestingModule } from '@nestjs/testing';
import { ResselerController } from './resseler.controller';
import { ResselerService } from './resseler.service';

describe('ResselerController', () => {
  let controller: ResselerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResselerController],
      providers: [ResselerService],
    }).compile();

    controller = module.get<ResselerController>(ResselerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
