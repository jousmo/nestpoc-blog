import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetArticleByIdQuery } from './get-article-by-id.query';
import { ArticleRepository } from '../../domain/repositories/article.repository';
import { Article } from '../../domain/entities/article.domain-entity';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetArticleByIdQuery)
export class GetArticleByIdHandler
  implements IQueryHandler<GetArticleByIdQuery>
{
  constructor(private readonly articleRepository: ArticleRepository) {}

  async execute(query: GetArticleByIdQuery): Promise<Article> {
    const article = await this.articleRepository.findById(query.id);

    if (!article) {
      throw new NotFoundException(`Article with id ${query.id} not found`);
    }

    return article;
  }
}
