export class UserIdVO {
  constructor(public readonly value: string) {
    if (!value || value.length === 0) {
      throw new Error('User Id cannot be empty');
    }
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
