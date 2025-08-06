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

  async save(user: User): Promise<User> {
    const ormUser = this.ormRepo.create({
      id: user.id.getValue(),
      name: user.name.getValue(),
      email: user.email.getValue(),
    });
    const saved = await this.ormRepo.save(ormUser);

    const id = new UserIdVO(saved.id);
    const name = new UserNameVO(saved.name);
    const email = new UserEmailVO(saved.email);
    return new User(id, name, email);
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ data: User[]; total: number }> {
    const [users, total] = await this.ormRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { name: 'ASC' },
    });

    const data = users.map(
      (user) =>
        new User(
          new UserIdVO(user.id),
          new UserNameVO(user.name),
          new UserEmailVO(user.email),
        ),
    );

    return { data, total };
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.ormRepo.findOneBy({ email });
    if (!user) return null;

    const newId = new UserIdVO(user.id);
    const newName = new UserNameVO(user.name);
    const newEmail = new UserEmailVO(user.email);
    return new User(newId, newName, newEmail);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.ormRepo.findOneBy({ id });
    if (!user) return null;

    const newId = new UserIdVO(user.id);
    const newName = new UserNameVO(user.name);
    const newEmail = new UserEmailVO(user.email);
    return new User(newId, newName, newEmail);
  }

  async deleteById(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
}
