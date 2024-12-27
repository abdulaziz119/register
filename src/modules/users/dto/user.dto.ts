import { IsDefined } from 'class-validator';

export class AuthLoginDto {
  @IsDefined()
  phoneNumber: string;
  @IsDefined()
  password: string;
}

export class AuthResDto {
  @IsDefined()
  phoneNumber: string;

  @IsDefined()
  name: string;

  @IsDefined()
  password: string;
}

export class PaginationParams {
  @IsDefined()
  page: number;
  @IsDefined()
  limit: number;
}
export interface SingleResponse<T> {
  result: T;
}
