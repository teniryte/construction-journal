import { ConflictException, Injectable } from '@nestjs/common';
import type { CreateWorkTypeDto, WorkType } from '@construction-journal/shared';
import { WorkTypeRepository } from './work-type.repository';
import { Prisma } from '../../infrastructure/prisma/generated/client';

@Injectable()
export class WorkTypeService {
  constructor(private readonly repository: WorkTypeRepository) {}

  findAll(): Promise<WorkType[]> {
    return this.repository.findAll();
  }

  async create(input: CreateWorkTypeDto): Promise<WorkType> {
    try {
      return await this.repository.create({ name: input.name.trim() });
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Work type already exists');
      }

      throw error;
    }
  }
}
