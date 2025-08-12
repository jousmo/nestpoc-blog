import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginatedResultType } from '../../../shared/domain/contracts/paginated-result.type';
import { GetAllArticleQuery } from './get-all-articles.query';
import { Article } from '../../domain/entities/article.domain-entity';
import { ArticleRepository } from '../../domain/repositories/article.repository';

@QueryHandler(GetAllArticleQuery)
export class GetAllArticlesHandler
  implements IQueryHandler<GetAllArticleQuery>
{
  constructor(private readonly articleRepository: ArticleRepository) {}

  async execute(
    query: GetAllArticleQuery,
  ): Promise<PaginatedResultType<Article>> {
    return this.articleRepository.findAll(query.page, query.limit);
  }
}
