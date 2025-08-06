import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleRepository } from '../../domain/repositories/article.repository';
import { ArticleOrmEntity } from './article.orm-entity';
import { Article } from '../../domain/entities/article.domain-entity';
import { User } from '../../domain/entities/user.domain-entity';
import { ArticleTitleVO } from '../../domain/value-objects/article-title.vo';
import { ArticleContentVO } from '../../domain/value-objects/article-content.vo';
import { UserIdVO } from '../../domain/value-objects/user-id.vo';
import { ArticleIdVO } from '../../domain/value-objects/article-id.vo';
import { UserNameVO } from '../../domain/value-objects/user-name.vo';
import { UserEmailVO } from '../../domain/value-objects/user-email.vo';

@Injectable()
export class ArticleRepositoryImpl implements ArticleRepository {
  constructor(
    @InjectRepository(ArticleOrmEntity)
    private readonly ormRepo: Repository<ArticleOrmEntity>,
  ) {}

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ data: Article[]; total: number }> {
    const [articles, total] = await this.ormRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { title: 'ASC' },
      relations: ['user'],
    });

    const data = articles.map((article) => {
      const userOrm = article.user;
      const user = userOrm
        ? new User(
            new UserIdVO(userOrm.id),
            new UserNameVO(userOrm.name),
            new UserEmailVO(userOrm.email),
          )
        : null;

      return new Article(
        new ArticleIdVO(article.id),
        new ArticleTitleVO(article.title),
        new ArticleContentVO(article.content),
        new UserIdVO(article.userId),
        user,
      );
    });

    return { data, total };
  }

  async save(article: Article): Promise<Article> {
    const ormArticle = this.ormRepo.create({
      id: article.id.getValue(),
      title: article.title.getValue(),
      content: article.content.getValue(),
      userId: article.userId.getValue(),
    });

    const saved = await this.ormRepo.save(ormArticle);

    const id = new ArticleIdVO(saved.id);
    const title = new ArticleTitleVO(saved.title);
    const content = new ArticleContentVO(saved.content);
    const userId = new UserIdVO(saved.userId);

    return new Article(id, title, content, userId, article.user);
  }

  async findById(id: string): Promise<Article | null> {
    const article = await this.ormRepo.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!article) return null;

    const userOrm = article.user;

    if (!userOrm) return null;

    const user = new User(
      new UserIdVO(userOrm.id),
      new UserNameVO(userOrm.name),
      new UserEmailVO(userOrm.email),
    );

    return new Article(
      new ArticleIdVO(article.id),
      new ArticleTitleVO(article.title),
      new ArticleContentVO(article.content),
      new UserIdVO(article.userId),
      user,
    );
  }

  async deleteById(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
}
