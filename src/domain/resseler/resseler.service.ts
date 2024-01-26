import { Injectable } from '@nestjs/common';
import { Reseller } from './resseller.schema';
import { User } from '../user/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CoinsTransferService } from 'src/shared/services/coins/transfer.service';
import { ResellerCoinsStrategy } from './strategy/coins/transfer.strategy';
import { TransferDTO } from 'src/shared/services/coins/dto/transfer.dto';

@Injectable()
export class ResselerService {
  constructor(
    @InjectModel(Reseller.name) private readonly resellerModel: Model<Reseller>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private coinsService: CoinsTransferService
  ) { }
    async transfer(transferDTO: TransferDTO) {
      this.coinsService.setStrategy(
        new ResellerCoinsStrategy(this.resellerModel, this.userModel));
      
      return await this.coinsService.transfer(transferDTO);
    }
}
