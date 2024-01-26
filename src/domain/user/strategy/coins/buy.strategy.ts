import { CoinsBuyStrategy } from "src/shared/services/coins/strategy/buy.strategy";
import { User } from "../../user.schema";
import { Model } from "mongoose";

export class UserBuyCoinsStrategy implements CoinsBuyStrategy {
  constructor(
    private userModel: Model<User>
  ) {}

  async purchase(buyerId: string, amount: number): Promise<void> {
    const buyer = await this.userModel.findOne({_id: buyerId});

    if (!buyer) throw new Error('Buyer not found');

    await this.userModel.findByIdAndUpdate(buyerId, {
      coins: buyer.coins + amount
    });
  }
  
}