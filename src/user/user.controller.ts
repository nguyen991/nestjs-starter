import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { ApiUseTags, ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { FindUserParam, CreateUserDto, FindAllQuery } from './dto';
import { User } from './models/user.model';
import { ReqUser } from '../decorator';

@UseGuards(AuthGuard('jwt'))
@ApiUseTags('user')
@ApiBearerAuth()
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
  async findAll(
    @Query() query: FindAllQuery,
    @ReqUser() user: User,
  ): Promise<User[]> {
    Logger.log(`Request user ${user}`);
    return await this.userService.findAll(query);
  }

  @Get(':id')
  @ApiCreatedResponse({ type: User })
  async find(@Param() params: FindUserParam) {
    return await this.userService.find(params.id);
  }
}
