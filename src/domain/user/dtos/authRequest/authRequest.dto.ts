import { IsNotEmpty } from 'class-validator';

export class AuthRequestDTO {
  @IsNotEmpty()
  userId: string;
}
