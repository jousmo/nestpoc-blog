import { Article } from '../../../domain/entities/article.domain-entity';

export class ArticleResponseDto {
  public readonly id: string;
  public readonly title: string;
  public readonly content: string;
  public readonly userId: string;
  public readonly user: {
    id?: string;
    name?: string;
    email?: string;
  };

  constructor(article: Article) {
    this.id = article.id.getValue();
    this.title = article.title.getValue();
    this.content = article.content.getValue();
    this.userId = article.userId.getValue();
    this.user = {
      id: article.user?.id.getValue(),
      name: article.user?.name.getValue(),
      email: article.user?.id.getValue(),
    };
  }
}
