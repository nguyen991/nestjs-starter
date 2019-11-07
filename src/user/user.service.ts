import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from './models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { CreateUserDto, FindAllQuery } from './dto/user.dto';

@Injectable()
export class UserService {
  @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>;

  async create(user: CreateUserDto) {
    const createdUser = new this.userModel(user);
    return await createdUser.save();
  }

  async findAll(query: FindAllQuery): Promise<User[] | null> {
    return await this.userModel
      .find()
      .limit(query.limit)
      .skip(query.skip)
      .exec();
  }

  async find(id: string) {
    return await this.userModel.findById(id);
  }

  async findByUsername(username: string) {
    return await this.userModel.findOne({ username });
  }
}
