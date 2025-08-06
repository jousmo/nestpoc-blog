import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/infrastructure/user.module';
import { ArticleModule } from './article/infrastructure/article.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'blog_user',
      password: 'blog_password',
      database: 'blog_db',
      entities: [__dirname + '/**/*.orm-entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    ArticleModule,
  ],
})
export class AppModule {}
