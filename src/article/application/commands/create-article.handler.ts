import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IDENTIFIER_GENERATOR } from 'src/shared/application/const/tokens';
import { IIdentifierGenerator } from 'src/shared/domain/contracts/id-generator.contract';
import { Article } from '../../domain/entities/article.domain-entity';
import { ArticleRepository } from '../../domain/repositories/article.repository';
import { UserRepository } from '../../domain/repositories/user.repository';
import { CreateArticleCommand } from './create-article.command';

@CommandHandler(CreateArticleCommand)
export class CreateArticleHandler
  implements ICommandHandler<CreateArticleCommand>
{
  constructor(
    @Inject(IDENTIFIER_GENERATOR)
    private readonly idGeneratorService: IIdentifierGenerator,
    private readonly articleRepository: ArticleRepository,
    private readonly userRepository: UserRepository,
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
