import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateArticleCommand } from './create-article.command';
import { ArticleRepository } from '../../domain/repositories/article.repository';
import { UserRepository } from '../../domain/repositories/user.repository';
import { Article } from '../../domain/entities/article.domain-entity';
import { NotFoundException } from '@nestjs/common';
import { IdGeneratorService } from 'src/shared/domain/contracts/id-generator.service';

@CommandHandler(CreateArticleCommand)
export class CreateArticleHandler
  implements ICommandHandler<CreateArticleCommand>
{
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly userRepository: UserRepository,
    private readonly idGeneratorService: IdGeneratorService,
  ) {}

  async execute(command: CreateArticleCommand): Promise<Article> {
    const { title, content, userId } = command;

    const user = await this.userRepository.getUserInfoById(userId);

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const id = this.idGeneratorService.createId();
    const article = Article.create(id, title, content, userId, user);
    return this.articleRepository.save(article);
  }
}
