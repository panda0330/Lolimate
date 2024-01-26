import { Min } from "class-validator";

export class BuyDTO {
  @Min(1)
  amount: number;
}