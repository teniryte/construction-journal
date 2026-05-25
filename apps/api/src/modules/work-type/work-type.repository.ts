import { Injectable } from '@nestjs/common';
import type { CreateWorkTypeDto, WorkType } from '@construction-journal/shared';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';

@Injectable()
export class WorkTypeRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<WorkType[]> {
    return this.prisma.workType.findMany({
      orderBy: { name: 'asc' },
    });
  }

  create(data: CreateWorkTypeDto): Promise<WorkType> {
    return this.prisma.workType.create({ data });
  }
}
