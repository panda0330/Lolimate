import { IsNotEmpty, Min } from "class-validator";

export class GitfDTO {
  @IsNotEmpty()
  recipientId: string

  @Min(1)
  amount: number;
}