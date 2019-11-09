import { IsInt, Min } from 'class-validator';
import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class FindAllQuery {
  @IsInt()
  @Min(0)
  @Transform(value => Number(value))
  @ApiModelPropertyOptional()
  readonly limit: number = 10;

  @IsInt()
  @Min(0)
  @Transform(value => Number(value))
  @ApiModelPropertyOptional()
  readonly skip: number = 0;
}
