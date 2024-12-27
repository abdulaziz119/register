import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { MODELS } from '../../constants';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entity/user.entity';
import { AuthLoginDto, AuthResDto, PaginationParams } from './dto/user.dto';
import { AuthorizationService } from '../../utils/authorization.service';
import { getPaginationResponse } from '../../utils/pagination.builder';

@Injectable()
export class UsersService {
  constructor(
    @Inject(MODELS.USERS)
    private readonly usersRepo: Repository<UserEntity>,

    private readonly authorizationService: AuthorizationService,
  ) {}

  async create(payload: AuthResDto) {
    const UsersModule = new UserEntity();
    UsersModule.name = payload.name;
    UsersModule.phoneNumber = payload.phoneNumber;
    UsersModule.password = payload.password;
    try {
      const result = await this.usersRepo.save(UsersModule);
      const token: string = await this.authorizationService.sign(result.id);
      return { result: { result, token } };
    } catch (error: any) {
      throw new HttpException(
        `Failed to create a user. ${error.message || 'Unknown error'}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(payload: AuthLoginDto) {
    try {
      const result = await this.usersRepo.findOne({
        where: {
          phoneNumber: payload.phoneNumber,
        },
      });
      if (!result) {
        throw new HttpException(
          'Invalid phone number or password',
          HttpStatus.UNAUTHORIZED,
        );
      }
      if (result.password !== payload.password) {
        throw new HttpException(
          'Invalid phone number or password',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const token: string = await this.authorizationService.sign(result.id);
      return { result: { result, token } };
    } catch (error: any) {
      throw new HttpException(
        `Failed to login. ${error.message || 'Unknown error'}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(payload: PaginationParams) {
    const page = payload.page || 1;
    const limit = payload.limit || 10;
    const count = await this.usersRepo.count();
    if (!count) return getPaginationResponse([], page, limit, count);
    const serverKeys = await this.usersRepo.find({
      where: {},
      skip: (page - 1) * limit,
      take: limit,
    });
    if (limit && !isNaN(page))
      return getPaginationResponse<UserEntity>(serverKeys, page, limit, count);
  }
}
