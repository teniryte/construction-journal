import { Injectable, NotFoundException } from '@nestjs/common';
import type {
  CreateWorkEntryDto,
  DeleteWorkEntriesDto,
  UpdateWorkEntryDto,
  WorkEntriesPage,
  WorkEntriesQuery,
  WorkEntry,
} from '@construction-journal/shared';
import { Prisma } from '../../infrastructure/prisma/generated/client';
import { WorkEntryRepository } from './work-entry.repository';

@Injectable()
export class WorkEntryService {
  constructor(private readonly repository: WorkEntryRepository) {}

  async findPage(query: WorkEntriesQuery): Promise<WorkEntriesPage> {
    const { items, total } = await this.repository.findPage(query);

    return {
      items,
      page: query.page,
      limit: query.limit,
      total,
    };
  }

  async findById(id: number): Promise<WorkEntry> {
    const entry = await this.repository.findById(id);

    if (!entry) {
      throw new NotFoundException('Work entry not found');
    }

    return entry;
  }

  create(input: CreateWorkEntryDto): Promise<WorkEntry> {
    return this.repository.create(input);
  }

  async update(id: number, input: UpdateWorkEntryDto): Promise<WorkEntry> {
    try {
      return await this.repository.update(id, input);
    } catch (error: unknown) {
      this.throwNotFoundForMissingEntry(error);
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.repository.remove(id);
    } catch (error: unknown) {
      this.throwNotFoundForMissingEntry(error);
      throw error;
    }
  }

  removeMany(input: DeleteWorkEntriesDto): Promise<void> {
    return this.repository.removeMany(input.ids);
  }

  private throwNotFoundForMissingEntry(error: unknown): void {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      throw new NotFoundException('Work entry not found');
    }
  }
}
