import { ApiModelProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class FindUserParam {
  @IsMongoId()
  @ApiModelProperty()
  readonly id: string;
}
