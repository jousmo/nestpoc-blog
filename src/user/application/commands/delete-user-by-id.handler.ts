import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../domain/repositories/user.repository';
import { DeleteUserByIdCommand } from './delete-user-by-id.command';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteUserByIdCommand)
export class DeleteUserByIdHandler
  implements ICommandHandler<DeleteUserByIdCommand>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: DeleteUserByIdCommand): Promise<void> {
    const user = await this.userRepository.findById(command.id);

    if (!user) {
      throw new NotFoundException(`User with id ${command.id} not found`);
    }

    return this.userRepository.deleteById(command.id);
  }
}
