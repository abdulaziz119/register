import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { usersProviders } from './users.providers';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthController } from './auth.controller';
import { AuthorizationService } from '../../utils/authorization.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController, AuthController],
  providers: [...usersProviders, UsersService, AuthorizationService],
  exports: [UsersService, AuthorizationService],
})
export class UsersModule {}
