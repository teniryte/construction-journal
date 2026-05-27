'use client';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { styled } from '@mui/material/styles';
import { Controller } from 'react-hook-form';
import { getErrorMessage } from '@/shared/lib';
import { AppDateField, ErrorState, LoadingState } from '@/shared/ui';
import {
  useWorkEntryForm,
  type WorkEntryFormMode,
} from '../model/use-work-entry-form';
import { useWorkTypeOptions } from '../model/use-work-type-options';
import { WorkTypeField } from './work-type-field';

type WorkEntryFormProps = {
  mode: WorkEntryFormMode;
  entryId?: string;
  onSaved?: () => void;
  onCancel?: () => void;
};

export function WorkEntryForm({
  mode,
  entryId,
  onSaved,
  onCancel,
}: WorkEntryFormProps) {
  const { entryQuery, form, isInvalidEntryId, saveMutation, submit } =
    useWorkEntryForm({ entryId, mode, onSaved });
  const workTypeOptions = useWorkTypeOptions(form);

  if (isInvalidEntryId) {
    return <ErrorState message="Некорректный идентификатор записи." />;
  }

  if (mode === 'edit' && entryQuery.isLoading) {
    return <LoadingState label="Загрузка записи..." />;
  }

  if (mode === 'edit' && entryQuery.error) {
    return <ErrorState message={getErrorMessage(entryQuery.error)} />;
  }

  return (
    <Card>
      <CardContent>
        <Stack component="form" spacing={2} onSubmit={submit}>
          {saveMutation.error ? (
            <Alert severity="error">{getErrorMessage(saveMutation.error)}</Alert>
          ) : null}

          <Controller
            control={form.control}
            name="date"
            render={({ field, fieldState }) => (
              <AppDateField
                fullWidth
                error={Boolean(fieldState.error)}
                helperText={fieldState.error?.message}
                label="Дата выполнения"
                size="small"
                value={field.value}
                onBlur={field.onBlur}
                onChange={(value) => field.onChange(value ?? '')}
              />
            )}
          />

          <WorkTypeField
            control={form.control}
            isCreating={workTypeOptions.createTypeMutation.isPending}
            isLoading={workTypeOptions.isLoading}
            options={workTypeOptions.options}
            onCreateType={workTypeOptions.onCreateType}
          />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              error={Boolean(form.formState.errors.volume)}
              helperText={form.formState.errors.volume?.message}
              label="Объем"
              slotProps={{ htmlInput: { min: 0, step: 'any' } }}
              type="number"
              onFocus={(event) => event.target.select()}
              {...form.register('volume', { valueAsNumber: true })}
            />
            <TextField
              fullWidth
              error={Boolean(form.formState.errors.unit)}
              helperText={form.formState.errors.unit?.message}
              label="Единица измерения"
              {...form.register('unit')}
            />
          </Stack>

          <TextField
            fullWidth
            error={Boolean(form.formState.errors.executorName)}
            helperText={form.formState.errors.executorName?.message}
            label="ФИО исполнителя"
            {...form.register('executorName')}
          />

          <ActionsStack direction="row" spacing={1}>
            <Button
              disabled={saveMutation.isPending}
              startIcon={<CloseIcon />}
              onClick={onCancel}
            >
              Отмена
            </Button>
            <Button
              disabled={saveMutation.isPending}
              startIcon={
                saveMutation.isPending ? undefined : mode === 'create' ? (
                  <AddIcon />
                ) : (
                  <SaveIcon />
                )
              }
              type="submit"
              variant="contained"
            >
              {saveMutation.isPending ? (
                <CircularProgress color="inherit" size={20} />
              ) : mode === 'create' ? (
                'Создать'
              ) : (
                'Сохранить'
              )}
            </Button>
          </ActionsStack>
        </Stack>
      </CardContent>
    </Card>
  );
}

const ActionsStack = styled(Stack)({
  justifyContent: 'flex-end',
});
