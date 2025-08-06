import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateArticleDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  title: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  content: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
