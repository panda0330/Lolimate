import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator"

export class BuyDTO {
  @IsNotEmpty()
  @IsString()
  buyerId: string;

  @Min(1)
  @IsNumber()
  amount: number
}