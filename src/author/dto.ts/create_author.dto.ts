import { InputType, Field } from 'type-graphql';
import { IsString, IsDate } from 'class-validator';

@InputType()
export class CreateAuthorDto {
  @Field()
  @IsString()
  readonly firstName: string;

  @Field()
  @IsString()
  readonly lastName: string;

  @Field()
  @IsDate()
  readonly date: Date;
}
