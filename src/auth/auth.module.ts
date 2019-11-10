import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '../config';
import { UserModule } from '../user';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => ({
        secret: config.jwtSecret,
        // signOptions: { expiresIn: '60s' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
