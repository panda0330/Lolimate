import { IsNotEmpty } from 'class-validator';

export class AdminLoginDTO {
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  password: string;
}
