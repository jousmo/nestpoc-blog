import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllUsersQuery } from './get-all-users.query';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.domain-entity';
import { PaginatedResultType } from '../../../shared/types/paginated-result.type';

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersHandler implements IQueryHandler<GetAllUsersQuery> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetAllUsersQuery): Promise<PaginatedResultType<User>> {
    return this.userRepository.findAll(query.page, query.limit);
  }
}
