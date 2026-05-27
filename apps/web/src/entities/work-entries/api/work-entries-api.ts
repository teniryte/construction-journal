import type {
  CreateWorkEntryDto,
  DeleteWorkEntriesDto,
  UpdateWorkEntryDto,
  WorkEntriesPage,
  WorkEntriesQuery,
  WorkEntry,
} from '@construction-journal/shared';
import {
  workEntriesPageSchema,
  workEntrySchema,
} from '@construction-journal/shared';
import { apiClient } from '@/shared/api';

export type WorkEntriesListParams = {
  begin: string | null;
  end: string | null;
  sort: WorkEntriesQuery['sort'];
  page: number;
  limit: number;
};

export const workEntriesQueryKeys = {
  all: ['work-entries'] as const,
  list: (params: WorkEntriesListParams) =>
    ['work-entries', params] as const,
  detail: (id: number) => ['work-entry', id] as const,
};

export async function getWorkEntries(
  params: WorkEntriesListParams,
): Promise<WorkEntriesPage> {
  const data = await apiClient.get<unknown>('/work-entries', {
    begin: params.begin ?? undefined,
    end: params.end ?? undefined,
    sort: params.sort,
    page: params.page,
    limit: params.limit,
  });

  return workEntriesPageSchema.parse(data);
}

export async function getWorkEntry(id: number): Promise<WorkEntry> {
  const data = await apiClient.get<unknown>(`/work-entries/${id}`);

  return workEntrySchema.parse(data);
}

export async function createWorkEntry(
  input: CreateWorkEntryDto,
): Promise<WorkEntry> {
  const data = await apiClient.post<unknown>('/work-entries', input);

  return workEntrySchema.parse(data);
}

export async function updateWorkEntry(
  id: number,
  input: UpdateWorkEntryDto,
): Promise<WorkEntry> {
  const data = await apiClient.put<unknown>(`/work-entries/${id}`, input);

  return workEntrySchema.parse(data);
}

export function deleteWorkEntry(id: number): Promise<void> {
  return apiClient.delete(`/work-entries/${id}`);
}

export function deleteWorkEntries(
  input: DeleteWorkEntriesDto,
): Promise<void> {
  return apiClient.delete('/work-entries', input);
}
