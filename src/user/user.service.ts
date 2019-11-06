import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from './models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>;

  async create(user: CreateUserDto) {
    const createdUser = new this.userModel(user);
    return await createdUser.save();
  }

  async findALl(): Promise<User[] | null> {
    return await this.userModel.find().exec();
  }
}
