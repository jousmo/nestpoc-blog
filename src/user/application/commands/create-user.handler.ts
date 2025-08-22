import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { User } from '../../domain/entities/user.domain-entity';
import { UserRepository } from '../../domain/repositories/user.repository';
import { CreateUserCommand } from './create-user.command';
import { IDENTIFIER_GENERATOR } from 'src/shared/application/const/tokens';
import { Inject } from '@nestjs/common';
import { IIdentifierGenerator } from 'src/shared/domain/contracts/id-generator.contract';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(IDENTIFIER_GENERATOR)
    private readonly idGeneratorService: IIdentifierGenerator,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: CreateUserCommand): Promise<User> {
    const id = this.idGeneratorService.createId();
    const user = User.create(id, command.name, command.email);
    return this.userRepository.save(user);
  }
}
