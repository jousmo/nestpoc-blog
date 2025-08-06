import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from './update-user.command';
import { UserRepository } from '../../domain/repositories/user.repository';
import { NotFoundException } from '@nestjs/common';
import { User } from '../../domain/entities/user.domain-entity';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: UpdateUserCommand): Promise<User> {
    const user = await this.userRepository.findById(command.id);

    if (!user) {
      throw new NotFoundException(`User with id ${command.id} not found`);
    }

    const updateUser = user.update(command.name, command.email);

    return this.userRepository.save(updateUser);
  }
}
