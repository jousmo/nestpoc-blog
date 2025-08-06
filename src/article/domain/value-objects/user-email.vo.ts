export class UserEmailVO {
  private readonly value: string;

  constructor(value: string) {
    if (!this.validate(value)) {
      throw new Error('Invalid email format');
    }

    this.value = value;
  }

  private validate(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: UserEmailVO): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
