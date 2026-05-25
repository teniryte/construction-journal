import { Module } from '@nestjs/common';
import { WorkTypeController } from './work-type.controller';
import { WorkTypeRepository } from './work-type.repository';
import { WorkTypeService } from './work-type.service';

@Module({
  controllers: [WorkTypeController],
  providers: [WorkTypeService, WorkTypeRepository],
})
export class WorkTypeModule {}
