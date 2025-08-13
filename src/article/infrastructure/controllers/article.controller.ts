import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  ParseUUIDPipe,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateArticleCommand } from '../../application/commands/create-article.command';
import { CreateArticleDto } from '../../application/dto/create-article.dto';
import { ArticleResponseDto } from './dto/article-response.dto';
import { Article } from '../../domain/entities/article.domain-entity';
import { GetArticleByIdQuery } from '../../application/queries/get-article-by-id.query';
import { DeleteArticleByIdCommand } from '../../application/commands/delete-article-by-id.command';
import { UpdateArticleDto } from '../../application/dto/update-article.dto';
import { UpdateArticleCommand } from '../../application/commands/update-article.command';
import { PaginationQueryDto } from '../../../shared/infrastructure/dto/pagination-query.dto';
import { PaginatedResponseDto } from '../../../shared/infrastructure/dto/paginated-response.dto';
import { PaginatedResultType } from '../../../shared/domain/contracts/paginated-result.type';
import { GetAllArticleQuery } from 'src/article/application/queries/get-all-articles.query';

@Controller('articles')
export class ArticleController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  async getAll(
    @Query() pagination: PaginationQueryDto,
  ): Promise<PaginatedResponseDto<ArticleResponseDto>> {
    const { page, limit } = pagination;
    const query = new GetAllArticleQuery(page, limit);
    const result = await this.queryBus.execute<
      GetAllArticleQuery,
      PaginatedResultType<Article>
    >(query);

    return new PaginatedResponseDto<ArticleResponseDto>({
      data: result.data.map((article) => new ArticleResponseDto(article)),
      total: result.total,
      page,
      limit,
    });
  }

  @Get(':id')
  async findById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ArticleResponseDto> {
    const query = new GetArticleByIdQuery(id);
    const article = await this.queryBus.execute<GetArticleByIdQuery, Article>(
      query,
    );

    return new ArticleResponseDto(article);
  }

  @Post()
  async create(@Body() dto: CreateArticleDto): Promise<ArticleResponseDto> {
    const command = new CreateArticleCommand(
      dto.title,
      dto.content,
      dto.userId,
    );
    const newArticle = await this.commandBus.execute<
      CreateArticleCommand,
      Article
    >(command);

    return new ArticleResponseDto(newArticle);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateArticleDto,
  ): Promise<ArticleResponseDto> {
    const command = new UpdateArticleCommand(
      id,
      dto.userId,
      dto.title,
      dto.content,
    );
    const updatedArticle = await this.commandBus.execute<
      UpdateArticleCommand,
      Article
    >(command);

    return new ArticleResponseDto(updatedArticle);
  }

  @Delete(':id')
  async deleteById(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const command = new DeleteArticleByIdCommand(id);
    return this.commandBus.execute<DeleteArticleByIdCommand, void>(command);
  }
}
