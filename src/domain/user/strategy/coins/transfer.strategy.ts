import { CoinsTransferStrategy } from "src/shared/services/coins/strategy/transfer.strategy";
import { Model } from "mongoose";
import { User } from "src/domain/user/user.schema";

export class GiftTransferStrategy implements CoinsTransferStrategy {
  constructor(
    private userModel: Model<User>
  ) { }

  async transact(senderId: string, receiverId: string, amount: number): Promise<void> {
    const [sender, receiver] = await Promise.all([
      this.userModel.findOne({_id: senderId}),
      this.userModel.findOne({_id: receiverId})
    ]);

    if (!sender) throw new Error('Sender not found!');
    if (!receiver) throw new Error('Recipient not found!');
    if (!receiver.isHost) throw new Error('Recipient is not a host.');
    if (amount > sender.coins) throw new Error(`You have only ${sender.coins} coins!`);

    await Promise.all([
      this.userModel.findByIdAndUpdate(sender._id, {
        coins: sender.coins - amount,
      }),
      this.userModel.findByIdAndUpdate(receiver._id, {
        coins: receiver.coins + amount,
      }),
    ]);
  }
  
}