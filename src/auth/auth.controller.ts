import { Controller, Post, UseGuards, Req, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ApiUseTags } from '@nestjs/swagger';
import { ValidateUserDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { User } from '../user/models/user.model';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Req() req: Request, @Body() val: ValidateUserDto) {
    return this.authService.login(req.user as User);
  }
}
