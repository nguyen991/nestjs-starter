import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Author } from './models/author.model';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class AuthorService {
  @InjectModel(Author) private readonly authModel: ReturnModelType<
    typeof Author
  >;

  async findById(id: string) {
    return await this.authModel.findById(id);
  }

  async create(data: Author) {
    return await this.authModel.create(data);
  }
}
