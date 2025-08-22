import { Module } from '@nestjs/common';
import { IDENTIFIER_GENERATOR } from '../application/const/tokens';
import { IdGeneratorServiceImpl } from './services/id-generator.service.impl';

@Module({
  providers: [
    {
      provide: IDENTIFIER_GENERATOR,
      useClass: IdGeneratorServiceImpl,
    },
  ],
  exports: [IDENTIFIER_GENERATOR],
})
export class SharedModule {}
