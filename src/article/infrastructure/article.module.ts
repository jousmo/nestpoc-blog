import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { ArticleController } from './controllers/article.controller';
import { ArticleRepositoryImpl } from './persistence/article.repository.impl';
import { UserRepositoryImpl } from './persistence/user.repository.impl';
import { ArticleOrmEntity } from './persistence/article.orm-entity';
import { UserOrmEntity } from './persistence/user.orm-entity';
import { CreateArticleHandler } from '../application/commands/create-article.handler';
import { ArticleRepository } from '../domain/repositories/article.repository';
import { UserRepository } from '../domain/repositories/user.repository';
import { GetArticleByIdHandler } from '../application/queries/get-article-by-id.handler';
import { DeleteArticleByIdHandler } from '../application/commands/delete-article-by-id.handler';
import { UpdateArticleHandler } from '../application/commands/update-article.handler';
import { GetAllArticlesHandler } from '../application/queries/get-all-articles.handler';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([ArticleOrmEntity, UserOrmEntity]),
  ],
  controllers: [ArticleController],
  providers: [
    {
      provide: ArticleRepository,
      useClass: ArticleRepositoryImpl,
    },
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
    GetAllArticlesHandler,
    CreateArticleHandler,
    GetArticleByIdHandler,
    DeleteArticleByIdHandler,
    UpdateArticleHandler,
  ],
})
export class ArticleModule {}
