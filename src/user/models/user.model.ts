import { getModelForClass, prop } from '@typegoose/typegoose';

export class User {
  @prop({ required: true })
  name: string;

  @prop({ required: true, min: 0 })
  age: number;
}

// export const UserModel = getModelForClass(User);
