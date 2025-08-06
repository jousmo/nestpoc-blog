export class UserIdVO {
  private readonly value: string;

  constructor(value: string) {
    if (!value) {
      throw new Error('User ID cannot be empty');
    }
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: UserIdVO): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
