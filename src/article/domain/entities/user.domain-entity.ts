import { UserNameVO } from '../value-objects/user-name.vo';
import { UserEmailVO } from '../value-objects/user-email.vo';
import { UserIdVO } from '../value-objects/user-id.vo';

export class User {
  constructor(
    public readonly id: UserIdVO,
    public name: UserNameVO,
    public email: UserEmailVO,
  ) {}
}
