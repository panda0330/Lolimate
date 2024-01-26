import { CoinsTransferStrategy } from "src/shared/services/coins/strategy/transfer.strategy";
import { Reseller } from "../../resseller.schema";
import { Model } from "mongoose";
import { User } from "src/domain/user/user.schema";

export class ResellerCoinsStrategy implements CoinsTransferStrategy {
  constructor(
    private resellerModel: Model<Reseller>,
    private userModel: Model<User>
  ) { }

  async transact(senderId: string, receiverId: string, amount: number): Promise<void> {
    const [sender, receiver] = await Promise.all([
      this.resellerModel.findOne({ userId: senderId }),
      this.userModel.findOne({ _id: receiverId })
    ]);

    if (!sender) throw new Error('You are not a resseler!');
    if (!receiver) throw new Error('Recipient not found!');
    if (amount > sender.amount) throw new Error(`You have only ${sender.amount} coins!`);

    await Promise.all([
      this.resellerModel.findByIdAndUpdate(sender._id, {
        amount: sender.amount - amount,
        totalCoinsSold: sender.totalCoinsSold + amount
      }),
      this.userModel.findByIdAndUpdate(receiver._id, {
        coins: receiver.coins + amount,
      }),
    ]);
  }

}