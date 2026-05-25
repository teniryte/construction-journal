import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import type {
  CreateWorkEntryDto,
  DeleteWorkEntriesDto,
  UpdateWorkEntryDto,
  WorkEntriesPage,
  WorkEntriesQuery,
  WorkEntry,
} from '@construction-journal/shared';
import {
  createWorkEntrySchema,
  deleteWorkEntriesSchema,
  updateWorkEntrySchema,
  workEntriesQuerySchema,
  workEntryIdSchema,
} from '@construction-journal/shared';
import { ZodValidationPipe } from '../../infrastructure/validation/zod-validation.pipe';
import { WorkEntryService } from './work-entry.service';

@Controller('work-entries')
export class WorkEntryController {
  constructor(private readonly service: WorkEntryService) {}

  @Get()
  findPage(
    @Query(new ZodValidationPipe(workEntriesQuerySchema))
    query: WorkEntriesQuery,
  ): Promise<WorkEntriesPage> {
    return this.service.findPage(query);
  }

  @Get(':id')
  findById(
    @Param('id', new ZodValidationPipe(workEntryIdSchema)) id: number,
  ): Promise<WorkEntry> {
    return this.service.findById(id);
  }

  @Post()
  create(
    @Body(new ZodValidationPipe(createWorkEntrySchema))
    input: CreateWorkEntryDto,
  ): Promise<WorkEntry> {
    return this.service.create(input);
  }

  @Put(':id')
  update(
    @Param('id', new ZodValidationPipe(workEntryIdSchema)) id: number,
    @Body(new ZodValidationPipe(updateWorkEntrySchema))
    input: UpdateWorkEntryDto,
  ): Promise<WorkEntry> {
    return this.service.update(id, input);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('id', new ZodValidationPipe(workEntryIdSchema)) id: number,
  ): Promise<void> {
    return this.service.remove(id);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  removeMany(
    @Body(new ZodValidationPipe(deleteWorkEntriesSchema))
    input: DeleteWorkEntriesDto,
  ): Promise<void> {
    return this.service.removeMany(input);
  }
}
