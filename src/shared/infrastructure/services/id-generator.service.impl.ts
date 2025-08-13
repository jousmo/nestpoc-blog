import { IdGeneratorService } from 'src/shared/domain/contracts/id-generator.service';
import { v4 as uuidv4 } from 'uuid';

export class IdGeneratorServiceImpl implements IdGeneratorService {
  createId(): string {
    return uuidv4();
  }
}
