import { prop, modelOptions } from '@typegoose/typegoose';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@modelOptions({ schemaOptions: { timestamps: true } })
export class Author {
  _id?: string;

  @prop()
  @Field()
  firstName?: string;

  @prop()
  @Field()
  lastName?: string;

  @prop()
  @Field()
  date?: Date;
}
