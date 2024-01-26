export interface CoinsBuyStrategy {
  purchase(buyerId: string, amount: number): Promise<void>;
}