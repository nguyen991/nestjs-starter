import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { ValidateUserDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser({ username, password }: ValidateUserDto) {
    const user = await this.userService.findByUsername(username);
    if (user && user.password === password) {
      delete user.password;
      return user;
    }
    return null;
  }
}
