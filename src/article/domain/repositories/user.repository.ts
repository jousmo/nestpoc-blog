import { User } from '../entities/user.domain-entity';

export abstract class UserRepository {
  abstract getUserInfoById(id: string): Promise<User | null>;
}
