import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorResolver } from './author.resolver';
import { TypegooseModule } from 'nestjs-typegoose';
import { Author } from './models/author.model';
import { DateScalar } from '../scalars/data.scalar';

@Module({
  imports: [TypegooseModule.forFeature([Author])],
  providers: [AuthorService, AuthorResolver, DateScalar],
})
export class AuthorModule {}
