import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, Min, Max, IsMongoId } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @ApiModelProperty()
  @IsString()
  readonly name: string;

  @ApiModelProperty()
  @IsInt()
  @Min(0)
  @Max(50)
  readonly age: number;
}

export class FindUserParam {
  @IsMongoId()
  @ApiModelProperty()
  readonly id: string;
}

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
