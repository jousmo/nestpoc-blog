export class UpdateArticleCommand {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly title?: string,
    public readonly content?: string,
  ) {}
}
