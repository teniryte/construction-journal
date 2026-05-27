'use client';

import { Controller } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import type { WorkTypeOption } from '@/entities/work-types';
import { AppCreatableSelect } from '@/shared/ui';
import type { WorkEntryFormValues } from '../model/use-work-entry-form';

type WorkTypeFieldProps = {
  control: Control<WorkEntryFormValues>;
  isCreating: boolean;
  isLoading: boolean;
  options: WorkTypeOption[];
  onCreateType: (name: string) => void;
};

export function WorkTypeField({
  control,
  isCreating,
  isLoading,
  options,
  onCreateType,
}: WorkTypeFieldProps) {
  return (
    <Controller
      control={control}
      name="workType"
      render={({ field, fieldState }) => {
        const selectedType =
          options.find((option) => option.value === field.value) ??
          (field.value ? { label: field.value, value: field.value } : null);

        return (
          <AppCreatableSelect<WorkTypeOption>
            disabled={isLoading}
            error={Boolean(fieldState.error)}
            helperText={
              fieldState.error?.message ??
              (isCreating ? 'Сохраняем новый вид работ...' : ' ')
            }
            label="Вид работ"
            loading={isLoading || isCreating}
            options={options}
            value={selectedType}
            onBlur={field.onBlur}
            onChange={(option) => {
              field.onChange(option?.value ?? '');
            }}
            onCreateOption={onCreateType}
          />
        );
      }}
    />
  );
}
