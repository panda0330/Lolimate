import { AuthRequestDTO } from '../authRequest/authRequest.dto';

export class UpdateUserDTO extends AuthRequestDTO {
  nickname?: string;
  gender: string;
  region: string;
  selfIntroduction;
}
