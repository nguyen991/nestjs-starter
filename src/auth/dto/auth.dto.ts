import { IsString } from 'class-validator';

export class ValidateUserDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;
}
