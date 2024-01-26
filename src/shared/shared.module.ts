import { Module } from '@nestjs/common';
import { Agency, AgencySchema } from './schemas/agency.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { LevelController } from './controllers/level/level.controller';
import { Level, LevelSchema } from 'src/shared/schemas/level.schema';
import { LevelService } from './services/level/level.service';
import { CoinsTransferService } from './services/coins/transfer.service';
import { CoinsBuyService } from './services/coins/buy.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {
        name: Agency.name,
        schema: AgencySchema,
      },
      {
        name: Level.name,
        schema: LevelSchema,
      },
    ]),
  ],
  exports: [
    MongooseModule,
    ConfigModule,
    CoinsTransferService,
    CoinsBuyService
  ],
  controllers: [LevelController],
  providers: [
    LevelService,
    CoinsTransferService,
    CoinsBuyService
  ],
})
export class SharedModule { }
