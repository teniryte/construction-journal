'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { CreateWorkEntryDto, WorkEntry } from '@construction-journal/shared';
import {
  workEntryIdSchema,
  workEntryInputSchema,
} from '@construction-journal/shared';
import {
  createWorkEntry,
  getWorkEntry,
  updateWorkEntry,
  workEntriesQueryKeys,
} from '@/entities/work-entries';
import { ApiError } from '@/shared/api';

export type WorkEntryFormMode = 'create' | 'edit';
export type WorkEntryFormValues = CreateWorkEntryDto;

export const emptyWorkEntryFormValues: WorkEntryFormValues = {
  date: '',
  workType: '',
  volume: 0,
  unit: '',
  executorName: '',
};

export function useWorkEntryForm({
  entryId,
  mode,
  onSaved,
}: {
  entryId?: string;
  mode: WorkEntryFormMode;
  onSaved?: () => void;
}) {
  const queryClient = useQueryClient();
  const parsedId = mode === 'edit' ? workEntryIdSchema.safeParse(entryId) : null;
  const numericEntryId = parsedId?.success ? parsedId.data : null;
  const form = useForm<WorkEntryFormValues>({
    resolver: zodResolver(workEntryInputSchema),
    defaultValues: emptyWorkEntryFormValues,
  });

  const entryQuery = useQuery({
    enabled: mode === 'edit' && numericEntryId !== null,
    queryKey:
      numericEntryId === null
        ? workEntriesQueryKeys.detail(0)
        : workEntriesQueryKeys.detail(numericEntryId),
    queryFn: () => getWorkEntry(numericEntryId as number),
  });

  const saveMutation = useMutation({
    mutationFn: (values: WorkEntryFormValues) => {
      if (mode === 'edit' && numericEntryId !== null) {
        return updateWorkEntry(numericEntryId, values);
      }

      return createWorkEntry(values);
    },
    onSuccess: async (entry) => {
      await queryClient.invalidateQueries({
        queryKey: workEntriesQueryKeys.all,
      });
      await queryClient.invalidateQueries({
        queryKey: workEntriesQueryKeys.detail(entry.id),
      });
      onSaved?.();
    },
    onError: (error) => {
      if (!(error instanceof ApiError)) {
        return;
      }

      error.fieldErrors.forEach((fieldError) => {
        const fieldName = fieldError.path[0] as
          | keyof WorkEntryFormValues
          | undefined;
        if (fieldName && fieldName in emptyWorkEntryFormValues) {
          form.setError(fieldName, { message: fieldError.message });
        }
      });
    },
  });

  useEffect(() => {
    if (mode === 'edit' && entryQuery.data) {
      form.reset(toFormValues(entryQuery.data));
    }
  }, [entryQuery.data, form, mode]);

  return {
    entryQuery,
    form,
    isInvalidEntryId: Boolean(mode === 'edit' && parsedId && !parsedId.success),
    saveMutation,
    submit: form.handleSubmit((values) => saveMutation.mutate(values)),
  };
}

function toFormValues(entry: WorkEntry): WorkEntryFormValues {
  return {
    date: entry.date,
    workType: entry.workType,
    volume: entry.volume,
    unit: entry.unit,
    executorName: entry.executorName,
  };
}
