import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthLoginDto, AuthResDto, SingleResponse } from './dto/user.dto';
import { UserEntity } from '../../entity/user.entity';
import { UsersService } from './users.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  @HttpCode(201)
  async create(@Body() body: AuthResDto) {
    return this.usersService.create(body);
  }

  @Post('/login')
  @HttpCode(200)
  async login(@Body() body: AuthLoginDto) {
    return this.usersService.login(body);
  }
}
