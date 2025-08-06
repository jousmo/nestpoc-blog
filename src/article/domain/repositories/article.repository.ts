import { Article } from '../entities/article.domain-entity';

export abstract class ArticleRepository {
  abstract save(article: Article): Promise<Article>;
  abstract findById(id: string): Promise<Article | null>;
  abstract deleteById(id: string): Promise<void>;
  abstract findAll(
    page: number,
    limit: number,
  ): Promise<{ data: Article[]; total: number }>;
}
