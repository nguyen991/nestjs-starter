import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ValidateUserDto } from './dto/auth.dto';
import { User, UserService } from '../user';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser({ username, password }: ValidateUserDto) {
    const user = await this.userService.findByUsername(username);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    return { access_token: this.jwtService.sign(user.getPayload()) };
  }
}
