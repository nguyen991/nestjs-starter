import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Author } from './models/author.model';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto.ts/create_author.dto';
import { ID } from 'type-graphql';

@Resolver(of => Author)
export class AuthorResolver {
  constructor(private readonly authorService: AuthorService) {}

  @Query(returns => Author)
  async getAuthor(@Args({ name: 'id', type: () => ID }) id: string) {
    return await this.authorService.findById(id);
  }

  @Mutation(returns => Author)
  async createAuthor(@Args('author') author: CreateAuthorDto) {
    return await this.authorService.create(author);
  }
}
