import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.domain-entity';
import { UserOrmEntity } from './user.orm-entity';
import { UserNameVO } from '../../domain/value-objects/user-name.vo';
import { UserEmailVO } from '../../domain/value-objects/user-email.vo';
import { UserIdVO } from '../../domain/value-objects/user-id.vo';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly ormRepo: Repository<UserOrmEntity>,
  ) {}

  async getUserInfoById(id: string): Promise<User | null> {
    const user = await this.ormRepo.findOneBy({ id });

    if (!user) return null;

    const newId = new UserIdVO(user.id);
    const newName = new UserNameVO(user.name);
    const newEmail = new UserEmailVO(user.email);
    return new User(newId, newName, newEmail);
  }
}
