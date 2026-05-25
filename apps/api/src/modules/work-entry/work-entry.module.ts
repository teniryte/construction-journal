import { Module } from '@nestjs/common';
import { WorkEntryController } from './work-entry.controller';
import { WorkEntryRepository } from './work-entry.repository';
import { WorkEntryService } from './work-entry.service';

@Module({
  controllers: [WorkEntryController],
  providers: [WorkEntryService, WorkEntryRepository],
})
export class WorkEntryModule {}
