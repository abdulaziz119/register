import { MODELS, TEST_SOURCE } from '../../constants';
import { DataSource } from 'typeorm';
import { UserEntity } from '../../entity/user.entity';

export const usersProviders = [
  {
    provide: MODELS.USERS,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserEntity),
    inject: [TEST_SOURCE],
  },
];
