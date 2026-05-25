import { Injectable } from '@nestjs/common';
import type {
  CreateWorkEntryDto,
  UpdateWorkEntryDto,
  WorkEntriesQuery,
  WorkEntry,
} from '@construction-journal/shared';
import type { Prisma } from '../../infrastructure/prisma/generated/client';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { WorkEntryRecord } from './types/work-entry-record.type';

@Injectable()
export class WorkEntryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findPage(
    query: WorkEntriesQuery,
  ): Promise<{ items: WorkEntry[]; total: number }> {
    const where = this.createDateFilter(query);

    const [records, total] = await this.prisma.$transaction([
      this.prisma.workEntry.findMany({
        where,
        orderBy: [{ date: query.sort }, { createdAt: 'desc' }, { id: 'desc' }],
        skip: (query.page - 1) * query.limit,
        take: query.limit,
      }),
      this.prisma.workEntry.count({ where }),
    ]);

    return {
      items: records.map((record) => this.toResponse(record)),
      total,
    };
  }

  async findById(id: number): Promise<WorkEntry | null> {
    const record = await this.prisma.workEntry.findUnique({ where: { id } });

    return record ? this.toResponse(record) : null;
  }

  async create(input: CreateWorkEntryDto): Promise<WorkEntry> {
    const record = await this.prisma.workEntry.create({
      data: {
        ...input,
        date: this.toDatabaseDate(input.date),
      },
    });

    return this.toResponse(record);
  }

  async update(id: number, input: UpdateWorkEntryDto): Promise<WorkEntry> {
    const record = await this.prisma.workEntry.update({
      where: { id },
      data: {
        ...input,
        date: this.toDatabaseDate(input.date),
      },
    });

    return this.toResponse(record);
  }

  async remove(id: number): Promise<void> {
    await this.prisma.workEntry.delete({ where: { id } });
  }

  async removeMany(ids: number[]): Promise<void> {
    await this.prisma.workEntry.deleteMany({
      where: { id: { in: ids } },
    });
  }

  private createDateFilter(
    query: WorkEntriesQuery,
  ): Prisma.WorkEntryWhereInput {
    if (!query.begin && !query.end) {
      return {};
    }

    return {
      date: {
        ...(query.begin && { gte: this.toDatabaseDate(query.begin) }),
        ...(query.end && { lte: this.toDatabaseDate(query.end) }),
      },
    };
  }

  private toDatabaseDate(date: string): Date {
    return new Date(`${date}T00:00:00.000Z`);
  }

  private toResponse(record: WorkEntryRecord): WorkEntry {
    return {
      id: record.id,
      date: record.date.toISOString().slice(0, 10),
      workType: record.workType,
      volume: record.volume,
      unit: record.unit,
      executorName: record.executorName,
    };
  }
}
