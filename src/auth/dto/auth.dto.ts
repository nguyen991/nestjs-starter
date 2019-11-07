import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class ValidateUserDto {
  @ApiModelProperty()
  @IsString()
  readonly username: string;

  @ApiModelProperty()
  @IsString()
  readonly password: string;
}
