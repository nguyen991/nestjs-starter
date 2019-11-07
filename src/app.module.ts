import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserModule } from './user/user.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { AuthModule } from './auth/auth.module';

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
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
