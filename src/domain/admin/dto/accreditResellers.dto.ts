import { IsNotEmpty } from 'class-validator';

export class AccreditResellerDTO {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  whatsapp: string;
}
