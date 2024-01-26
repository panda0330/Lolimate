import { Gender } from '../user.schema';
import { IsNotEmpty } from 'class-validator';

export class UserRegisterDTO {
  @IsNotEmpty()
  nickname: string;
  @IsNotEmpty()
  gender: Gender;
  @IsNotEmpty()
  age: number;
  @IsNotEmpty()
  typeOfLogin: string;
}
