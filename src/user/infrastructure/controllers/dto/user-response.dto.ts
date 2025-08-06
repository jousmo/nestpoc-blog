import { User } from '../../../domain/entities/user.domain-entity';

export class UserResponseDto {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;

  constructor(user: User) {
    this.id = user.id.getValue();
    this.name = user.name.getValue();
    this.email = user.email.getValue();
  }
}
