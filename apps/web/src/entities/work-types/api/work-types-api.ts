import type { CreateWorkTypeDto, WorkType } from '@construction-journal/shared';
import { workTypeSchema } from '@construction-journal/shared';
import { z } from 'zod';
import { apiClient } from '@/shared/api';

const workTypesSchema = z.array(workTypeSchema);

export const workTypesQueryKeys = {
  all: ['work-types'] as const,
};

export async function getWorkTypes(): Promise<WorkType[]> {
  const data = await apiClient.get<unknown>('/work-types');

  return workTypesSchema.parse(data);
}

export async function createWorkType(
  input: CreateWorkTypeDto,
): Promise<WorkType> {
  const data = await apiClient.post<unknown>('/work-types', input);

  return workTypeSchema.parse(data);
}
