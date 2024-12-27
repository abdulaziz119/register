import { Body, Controller, Headers, HttpCode, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { PaginationParams } from './dto/user.dto';
import { AuthorizationService } from '../../utils/authorization.service';

@Controller('/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authorizationService: AuthorizationService,
  ) {}

  @Post('/findAll')
  @HttpCode(200)
  async findAll(@Body() body: PaginationParams, @Headers() headers) {
    const token = headers['token'];
    await this.authorizationService.verify(token);
    return await this.usersService.findAll(body);
  }
}
