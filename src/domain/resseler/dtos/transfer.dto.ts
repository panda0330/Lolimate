import { IsNotEmpty, Min } from "class-validator";

export class TransferDTO {
  @IsNotEmpty()
  recipientId: string;

  @Min(1)
  amount: number
}