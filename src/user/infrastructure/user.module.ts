import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { UserRepository } from '../domain/repositories/user.repository';
import { UserRepositoryImpl } from './persistence/user.repository.impl';
import { UserOrmEntity } from './persistence/user.orm-entity';
import { CreateUserHandler } from '../application/commands/create-user.handler';
import { UserController } from './controllers/user.controller';
import { GetUserByIdHandler } from '../application/queries/get-user-by-id.handler';
import { GetUserByEmailHandler } from '../application/queries/get-user-by-email.handler';
import { DeleteUserByIdHandler } from '../application/commands/delete-user-by-id.handler';
import { UpdateUserHandler } from '../application/commands/update-user.handler';
import { GetAllUsersHandler } from '../application/queries/get-all-users.handler';
import { SharedModule } from '../../shared/infrastructure/shared.module';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([UserOrmEntity]),
    SharedModule
  ],
  controllers: [UserController],
  providers: [
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
    CreateUserHandler,
    GetUserByIdHandler,
    GetUserByEmailHandler,
    DeleteUserByIdHandler,
    UpdateUserHandler,
    GetAllUsersHandler,
  ],
  exports: [],
})
export class UserModule {}
