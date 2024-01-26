import { IsNotEmpty } from 'class-validator';
export class UserLoginDTO {
  @IsNotEmpty()
  typeOfLogin: string;
  @IsNotEmpty()
  credential: string;
}
