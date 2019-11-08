import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ValidateUserDto } from './dto/auth.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/models/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser({ username, password }: ValidateUserDto) {
    const user = await this.userService.findByUsername(username);
    if (user && user.password === password) {
      const { password: pass, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { _id: user._id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
