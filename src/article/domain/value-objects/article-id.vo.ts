export class ArticleIdVO {
  constructor(public readonly value: string) {
    if (!value || value.length === 0) {
      throw new Error('Article id cannot be empty');
    }
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: ArticleIdVO): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
