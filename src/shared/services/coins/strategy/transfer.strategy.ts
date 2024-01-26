export interface CoinsTransferStrategy {
  transact(senderId: string, receiverId: string, amount: number): Promise<void>;
}