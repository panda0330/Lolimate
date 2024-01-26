import { IsNotEmpty } from 'class-validator';

export class UserFollowDTO {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  targetId: string;
}
