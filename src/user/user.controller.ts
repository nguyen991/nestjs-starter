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
import { UserService } from './user.service';
import { FindUserParam } from './dto/find-user.dto';
import { User, IReqUser } from './models/user.model';
import { ApiUseTags, ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ReqUser } from '../decorator/req-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { FindAllQuery } from './dto/find-all.dto';

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
    @ReqUser() user: IReqUser,
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
