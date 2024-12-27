import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { TEST_SOURCE } from '../constants';
import { UserEntity } from '../entity/user.entity';
import { DB_DB, DB_HOST, DB_PASS, DB_PORT, DB_USER } from '../utils/env';

export const databaseProviders = [
  {
    provide: TEST_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: DB_HOST,
        port: DB_PORT,
        username: DB_USER,
        password: DB_PASS,
        database: DB_DB,
        synchronize: true,
        logging: false,
        schema: 'laravel',
        entities: [UserEntity],
      });
      await dataSource.initialize();
      return dataSource;
    },
  },
];
