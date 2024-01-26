import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Level } from 'src/shared/schemas/level.schema';

@Injectable()
export class LevelService {
  constructor(
    @InjectModel(Level.name) private readonly levelModel: Model<Level>,
  ) {}

  public async getAll() {
    return await this.levelModel.find().exec();
  }
}
