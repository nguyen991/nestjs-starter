import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards, Logger } from '@nestjs/common';
import { ID } from 'type-graphql';
import { Author } from './models/author.model';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto.ts/create_author.dto';
import { GqlAuthGuard } from '../auth';
import { User } from '../user';
import { ReqUser } from '../decorator';

@Resolver(of => Author)
@UseGuards(GqlAuthGuard)
export class AuthorResolver {
  constructor(private readonly authorService: AuthorService) {}

  @Query(returns => Author)
  async getAuthor(
    @ReqUser() user: User,
    @Args({ name: 'id', type: () => ID }) id: string,
  ) {
    Logger.log(`Request user ${JSON.stringify(user)}`);
    return await this.authorService.findById(id);
  }

  @Mutation(returns => Author)
  async createAuthor(@Args('author') author: CreateAuthorDto) {
    return await this.authorService.create(author);
  }
}
