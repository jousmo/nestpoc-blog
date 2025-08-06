import { User } from '../entities/user.domain-entity';

export abstract class UserRepository {
  abstract save(user: User): Promise<User>;
  abstract findAll(
    page: number,
    limit: number,
  ): Promise<{ data: User[]; total: number }>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
  abstract deleteById(id: string): Promise<void>;
}
