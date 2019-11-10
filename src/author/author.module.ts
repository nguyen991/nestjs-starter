import { TypegooseModule } from 'nestjs-typegoose';
import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorResolver } from './author.resolver';
import { Author } from './models/author.model';
import { DateScalar } from '../scalars/date.scalar';

@Module({
  imports: [TypegooseModule.forFeature([Author])],
  providers: [AuthorService, AuthorResolver, DateScalar],
})
export class AuthorModule {}
