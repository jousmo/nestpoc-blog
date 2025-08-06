import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateArticleCommand } from './update-article.command';
import { ArticleRepository } from '../../domain/repositories/article.repository';
import { NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';

@CommandHandler(UpdateArticleCommand)
export class UpdateArticleHandler
  implements ICommandHandler<UpdateArticleCommand>
{
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: UpdateArticleCommand) {
    const article = await this.articleRepository.findById(command.id);
    const user = await this.userRepository.getUserInfoById(command.userId);

    if (!article) {
      throw new NotFoundException(`Article with id ${command.id} not found`);
    }

    if (!user) {
      throw new NotFoundException(`User with id ${command.userId} not found`);
    }

    const updateArticle = article.update(
      user,
      command.userId,
      command.title,
      command.content,
    );

    return this.articleRepository.save(updateArticle);
  }
}
