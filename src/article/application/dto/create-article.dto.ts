import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  @MinLength(2)
  title: string;

  @IsNotEmpty()
  @MinLength(2)
  content: string;

  @IsNotEmpty()
  userId: string;
}
