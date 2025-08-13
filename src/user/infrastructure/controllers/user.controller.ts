import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Query,
  Patch,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUserByIdQuery } from '../../application/queries/get-user-by-id.query';
import { GetUserByEmailQuery } from '../../application/queries/get-user-by-email.query';
import { CreateUserCommand } from '../../application/commands/create-user.command';
import { CreateUserDto } from '../../application/dto/create-user.dto';
import { GetUserByEmailDto } from '../../application/dto/get-user-by-email.dto';
import { DeleteUserByIdCommand } from '../../application/commands/delete-user-by-id.command';
import { UpdateUserDto } from '../../application/dto/update-user.dto';
import { UpdateUserCommand } from '../../application/commands/update-user.command';
import { UserResponseDto } from './dto/user-response.dto';
import { User } from '../../domain/entities/user.domain-entity';
import { GetAllUsersQuery } from '../../application/queries/get-all-users.query';
import { PaginationQueryDto } from '../../../shared/infrastructure/dto/pagination-query.dto';
import { PaginatedResponseDto } from '../../../shared/infrastructure/dto/paginated-response.dto';
import { PaginatedResultType } from '../../../shared/domain/contracts/paginated-result.type';

@Controller('users')
export class UserController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  async getAll(
    @Query() pagination: PaginationQueryDto,
  ): Promise<PaginatedResponseDto<UserResponseDto>> {
    const { page, limit } = pagination;
    const query = new GetAllUsersQuery(page, limit);
    const result = await this.queryBus.execute<
      GetAllUsersQuery,
      PaginatedResultType<User>
    >(query);

    return new PaginatedResponseDto<UserResponseDto>({
      data: result.data.map((user) => new UserResponseDto(user)),
      total: result.total,
      page,
      limit,
    });
  }

  @Get(':id')
  async getById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UserResponseDto> {
    const query = new GetUserByIdQuery(id);
    const user = await this.queryBus.execute<GetUserByIdQuery, User>(query);

    return new UserResponseDto(user);
  }

  @Get('email/:email')
  async getByEmail(
    @Param() params: GetUserByEmailDto,
  ): Promise<UserResponseDto> {
    const query = new GetUserByEmailQuery(params.email);
    const user = await this.queryBus.execute<GetUserByEmailQuery, User>(query);

    return new UserResponseDto(user);
  }

  @Post()
  async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    const command = new CreateUserCommand(dto.name, dto.email);
    const newUser = await this.commandBus.execute<CreateUserCommand, User>(
      command,
    );

    return new UserResponseDto(newUser);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const command = new UpdateUserCommand(id, dto.name, dto.email);
    const newUser = await this.commandBus.execute<UpdateUserCommand, User>(
      command,
    );

    return new UserResponseDto(newUser);
  }

  @Delete(':id')
  async deleteById(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const command = new DeleteUserByIdCommand(id);
    return this.commandBus.execute<DeleteUserByIdCommand, void>(command);
  }
}
