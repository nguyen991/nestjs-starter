import { prop, modelOptions } from '@typegoose/typegoose';
import { ApiModelProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@modelOptions({ schemaOptions: { timestamps: true } })
export class User {
  @ApiModelProperty()
  _id?: string;

  @prop({
    required: true,
    minlength: 5,
    maxlength: 20,
  })
  @ApiModelProperty()
  username: string;

  @prop({ required: true })
  password: string;

  @prop({ required: true })
  @ApiModelProperty()
  name: string;

  @prop({ required: true, min: 0 })
  @ApiModelProperty()
  age: number;

  @Exclude()
  __v?: number;

  constructor(payload?: any) {
    // assign data from jwt payload
    if (payload) {
      Object.assign(this, payload);
    }
  }

  getPayload() {
    return { _id: this._id, username: this.username };
  }
}
