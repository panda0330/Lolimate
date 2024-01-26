import { Inject, Injectable } from '@nestjs/common';
import { BuyDTO } from './dto/buy.dto';
import { CoinsBuyStrategy } from './strategy/buy.strategy';

@Injectable()
export class CoinsBuyService {
  private buyStrategy: CoinsBuyStrategy

  public setStrategy(strategy: CoinsBuyStrategy) {
    this.buyStrategy = strategy;
  } 

  async buy({ buyerId, amount }: BuyDTO) {
    await this.buyStrategy.purchase(buyerId, amount)
    return {
      message: `Coins purchased successfully`,
      amount: amount
    }
  }

}