import { IsNotEmpty } from 'class-validator';
import { AuthRequestDTO } from './authRequest/authRequest.dto';

export class SelfIntroductionDTO extends AuthRequestDTO {
  @IsNotEmpty()
  selfIntroduction: string;
}
