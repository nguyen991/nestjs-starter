import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Author } from './models/author.model';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto.ts/create_author.dto';
import { ID } from 'type-graphql';
import { UseGuards, Logger } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { ReqUser } from '../decorator/req-user.decorator';
import { IReqUser } from '../user/models/user.model';

@Resolver(of => Author)
@UseGuards(GqlAuthGuard)
export class AuthorResolver {
  constructor(private readonly authorService: AuthorService) {}

  @Query(returns => Author)
  async getAuthor(
    @ReqUser() user: IReqUser,
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
