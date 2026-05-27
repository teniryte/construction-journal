'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { useWatch } from 'react-hook-form';
import type { WorkType } from '@construction-journal/shared';
import { createWorkTypeSchema } from '@construction-journal/shared';
import {
  createWorkType,
  getWorkTypes,
  toWorkTypeOption,
  workTypesQueryKeys,
} from '@/entities/work-types';
import { getErrorMessage } from '@/shared/lib';
import type { WorkEntryFormValues } from './use-work-entry-form';

export function useWorkTypeOptions(form: UseFormReturn<WorkEntryFormValues>) {
  const queryClient = useQueryClient();
  const workTypeValue = useWatch({
    control: form.control,
    name: 'workType',
  });

  const workTypesQuery = useQuery({
    queryKey: workTypesQueryKeys.all,
    queryFn: getWorkTypes,
  });

  const createTypeMutation = useMutation({
    mutationFn: (name: string) => createWorkType({ name }),
    onSuccess: (workType) => {
      upsertWorkTypeInCache(workType);
      form.clearErrors('workType');
    },
    onError: (error) => {
      form.setError('workType', { message: getErrorMessage(error) });
    },
  });

  const options = useMemo(() => {
    const apiOptions = (workTypesQuery.data ?? []).map(toWorkTypeOption);
    const hasSelectedType = apiOptions.some(
      (option) => option.value === workTypeValue,
    );

    if (!workTypeValue || hasSelectedType) {
      return apiOptions;
    }

    return [
      ...apiOptions,
      { label: workTypeValue, value: workTypeValue },
    ].sort((a, b) => a.label.localeCompare(b.label));
  }, [workTypeValue, workTypesQuery.data]);

  function handleCreateType(name: string) {
    const result = createWorkTypeSchema.safeParse({ name });

    if (!result.success) {
      form.setError('workType', {
        message: result.error.issues[0]?.message ?? 'Укажите вид работ',
      });
      return;
    }

    form.setValue('workType', result.data.name, {
      shouldDirty: true,
      shouldValidate: true,
    });
    form.clearErrors('workType');
    createTypeMutation.mutate(result.data.name);
  }

  function upsertWorkTypeInCache(workType: WorkType) {
    queryClient.setQueryData(
      workTypesQueryKeys.all,
      (current: WorkType[] | undefined) => {
        const items = current ?? [];
        const withoutSameName = items.filter(
          (item) => item.name !== workType.name,
        );

        return [...withoutSameName, workType].sort((a, b) =>
          a.name.localeCompare(b.name),
        );
      },
    );
  }

  return {
    createTypeMutation,
    isLoading: workTypesQuery.isLoading,
    options,
    onCreateType: handleCreateType,
  };
}
