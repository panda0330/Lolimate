import { Inject, Injectable } from '@nestjs/common';
import { TransferDTO } from './dto/transfer.dto';
import { CoinsTransferStrategy } from './strategy/transfer.strategy';


@Injectable()
export class CoinsTransferService {
  private coinsStrategy: CoinsTransferStrategy

  public setStrategy(strategy: CoinsTransferStrategy) {
    this.coinsStrategy = strategy;
  } 

  async transfer({ senderId, recipientId, amount }: TransferDTO) {
    if (senderId == recipientId) {
      throw new Error('Sender must be different than recipient.')
    }

    await this.coinsStrategy
      .transact(senderId, recipientId, amount);

    return {
      message: 'Coins transfered successfully.',
      amount: amount
    }
  }

}