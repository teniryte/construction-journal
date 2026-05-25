import { Body, Controller, Get, Post } from '@nestjs/common';
import type { CreateWorkTypeDto, WorkType } from '@construction-journal/shared';
import { createWorkTypeSchema } from '@construction-journal/shared';
import { ZodValidationPipe } from '../../infrastructure/validation/zod-validation.pipe';
import { WorkTypeService } from './work-type.service';

@Controller('work-types')
export class WorkTypeController {
  constructor(private readonly service: WorkTypeService) {}

  @Get()
  findAll(): Promise<WorkType[]> {
    return this.service.findAll();
  }

  @Post()
  create(
    @Body(new ZodValidationPipe(createWorkTypeSchema)) input: CreateWorkTypeDto,
  ): Promise<WorkType> {
    return this.service.create(input);
  }
}
