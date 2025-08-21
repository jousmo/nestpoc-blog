import { Module } from '@nestjs/common';
import { IdGeneratorService } from '../domain/contracts/id-generator.service';
import { IdGeneratorServiceImpl } from './services/id-generator.service.impl';

@Module({
  providers: [
    {
      provide: IdGeneratorService,
      useClass: IdGeneratorServiceImpl,
    },
  ],
  exports: [IdGeneratorService],
})
export class SharedModule {}