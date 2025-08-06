import { ArticleTitleVO } from '../value-objects/article-title.vo';
import { ArticleContentVO } from '../value-objects/article-content.vo';
import { UserIdVO } from '../value-objects/user-id.vo';
import { ArticleIdVO } from '../value-objects/article-id.vo';
import { User } from './user.domain-entity';

export class Article {
  constructor(
    public readonly id: ArticleIdVO,
    public title: ArticleTitleVO,
    public content: ArticleContentVO,
    public userId: UserIdVO,
    public user: User | null,
  ) {}

  static create(
    id: string,
    title: string,
    content: string,
    userId: string,
    user: User,
  ): Article {
    const newId = new ArticleIdVO(id);
    const newTitle = new ArticleTitleVO(title);
    const newContent = new ArticleContentVO(content);
    const newUserId = new UserIdVO(userId);

    return new Article(newId, newTitle, newContent, newUserId, user);
  }

  update(
    user: User,
    userId: string,
    title?: string,
    content?: string,
  ): Article {
    const newTitle = title ? new ArticleTitleVO(title) : this.title;
    const newContent = content ? new ArticleContentVO(content) : this.content;
    const newUserId = userId ? new UserIdVO(userId) : this.userId;

    return new Article(this.id, newTitle, newContent, newUserId, user);
  }
}
