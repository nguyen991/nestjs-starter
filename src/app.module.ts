import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user';
import { ConfigModule, ConfigService } from './config';
import { AuthModule } from './auth';
import { AuthorModule } from './author';

@Module({
  imports: [
    ConfigModule,
    TypegooseModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        uri: config.mongoDB,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req, body }) => ({ req, body }),
    }),
    UserModule,
    AuthorModule,
  ],
})
export class AppModule {}
