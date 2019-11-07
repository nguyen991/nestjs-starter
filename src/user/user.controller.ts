import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, FindUserParam, FindAllQuery } from './dto/user.dto';
import { User } from './models/user.model';
import { ApiUseTags, ApiCreatedResponse } from '@nestjs/swagger';

@ApiUseTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({ type: User })
  async create(@Body() userDto: CreateUserDto) {
    return await this.userService.create(userDto);
  }

  @Get()
  @ApiCreatedResponse({ type: [User] })
  async findAll(@Query() query: FindAllQuery): Promise<User[]> {
    return await this.userService.findAll(query);
  }

  @Get(':id')
  @ApiCreatedResponse({ type: User })
  async find(@Param() params: FindUserParam) {
    return await this.userService.find(params.id);
  }
}
