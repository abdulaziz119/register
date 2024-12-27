import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { Repository } from 'typeorm';
import { MODELS } from '../constants';
import { UserEntity } from '../entity/user.entity';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

@Injectable()
export class AuthorizationService {
  constructor(
    @Inject(MODELS.USERS)
    private readonly usersRepo: Repository<UserEntity>,
  ) {}

  async sign(user): Promise<string> {
    const data = {
      id: user,
    };
    const token = jwt.sign(data, JWT_SECRET, { expiresIn: '7d' });
    return token;
  }

  async verify(token: string): Promise<any> {
    if (!token) {
      throw new HttpException('Token is required', HttpStatus.UNAUTHORIZED);
    }
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
      const user = await this.usersRepo.findOneBy({ id: decoded.id });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
      }
      return decoded;
    } catch (error) {
      throw new HttpException(
        error.message || 'Token verification failed',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
