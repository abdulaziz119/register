import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

@Injectable()
export class AuthorizationService {
  async sign(user): Promise<string> {
    console.log(user)
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
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded;
    } catch (error) {
      throw new HttpException(
        error.message || 'Invalid token',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
