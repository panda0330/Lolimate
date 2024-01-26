import { Controller, Get } from '@nestjs/common';
import { LevelService } from 'src/shared/services/level/level.service';

@Controller('level')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @Get()
  public async getAllLevels() {
    return await this.levelService.getAll();
  }
}
