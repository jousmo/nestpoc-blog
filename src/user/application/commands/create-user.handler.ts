import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IdGeneratorService } from 'src/shared/domain/contracts/id-generator.service';
import { User } from '../../domain/entities/user.domain-entity';
import { UserRepository } from '../../domain/repositories/user.repository';
import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly idGeneratorService: IdGeneratorService,
  ) {}

  async execute(command: CreateUserCommand): Promise<User> {
    const id = this.idGeneratorService.createId();
    const user = User.create(id, command.name, command.email);
    return this.userRepository.save(user);
  }
}
