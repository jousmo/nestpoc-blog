import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ArticleRepository } from '../../domain/repositories/article.repository';
import { DeleteArticleByIdCommand } from './delete-article-by-id.command';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteArticleByIdCommand)
export class DeleteArticleByIdHandler
  implements ICommandHandler<DeleteArticleByIdCommand>
{
  constructor(private readonly articleRepository: ArticleRepository) {}

  async execute(command: DeleteArticleByIdCommand): Promise<void> {
    const article = await this.articleRepository.findById(command.id);

    if (!article) {
      throw new NotFoundException(`Article with id ${command.id} not found`);
    }

    return this.articleRepository.deleteById(command.id);
  }
}
