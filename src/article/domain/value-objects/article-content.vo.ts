export class ArticleContentVO {
  private readonly value: string;

  constructor(value: string) {
    if (!value || value.trim().length < 2) {
      throw new Error('Content must be at least 2 characters');
    }
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: ArticleContentVO): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
