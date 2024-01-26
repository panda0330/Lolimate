import { IsNotEmpty } from 'class-validator';

export class CreateLevelDTO {
  @IsNotEmpty()
  levelNumber: string;

  @IsNotEmpty()
  topUp: number;

  @IsNotEmpty()
  topDown: number;
}
