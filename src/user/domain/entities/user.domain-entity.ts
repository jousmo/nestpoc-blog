import { UserNameVO } from '../value-objects/user-name.vo';
import { UserEmailVO } from '../value-objects/user-email.vo';
import { UserIdVO } from '../value-objects/user-id.vo';

export class User {
  constructor(
    public readonly id: UserIdVO,
    public name: UserNameVO,
    public email: UserEmailVO,
  ) {}

  static create(id: string, name: string, email: string): User {
    const newId = new UserIdVO(id);
    const newName = new UserNameVO(name);
    const newEmail = new UserEmailVO(email);
    return new User(newId, newName, newEmail);
  }

  update(name?: string, email?: string): User {
    const newName = name ? new UserNameVO(name) : this.name;
    const newEmail = email ? new UserEmailVO(email) : this.email;
    return new User(this.id, newName, newEmail);
  }
}
