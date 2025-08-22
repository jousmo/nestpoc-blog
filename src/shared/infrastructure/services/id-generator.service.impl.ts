import { IIdentifierGenerator } from 'src/shared/domain/contracts/id-generator.contract';
import { v4 as uuidv4 } from 'uuid';

export class IdGeneratorServiceImpl implements IIdentifierGenerator {
  createId(): string {
    return uuidv4();
  }
}
