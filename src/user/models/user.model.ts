import { prop } from '@typegoose/typegoose';
import { ApiModelProperty } from '@nestjs/swagger';

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

  getReqUserPayload(): IReqUser {
    return { _id: this._id, username: this.username };
  }
}

export interface IReqUser {
  readonly _id: string;
  readonly username: string;
}
