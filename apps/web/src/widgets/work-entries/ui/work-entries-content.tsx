'use client';

import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import type { WorkEntriesPage, WorkEntry } from '@construction-journal/shared';
import type { WorkEntriesListParams } from '@/entities/work-entries';
import { WorkEntriesPagination } from '@/features/paginate-work-entries';
import { getErrorMessage } from '@/shared/lib';
import { EmptyState, ErrorState, LoadingState } from '@/shared/ui';
import { WorkEntriesTable } from './work-entries-table';

type WorkEntriesContentProps = {
  allVisibleSelected: boolean;
  data: WorkEntriesPage | undefined;
  editSearch: string;
  error: unknown;
  hasRangeError: boolean;
  isLoading: boolean;
  isPlaceholderData: boolean;
  items: WorkEntry[];
  params: WorkEntriesListParams;
  selectedIds: Set<number>;
  selectedVisibleCount: number;
  onDelete: (target: { ids: number[] }) => void;
  onPageChange: (page: number) => void;
  onToggleAllVisible: () => void;
  onToggleOne: (id: number) => void;
};

export function WorkEntriesContent({
  allVisibleSelected,
  data,
  editSearch,
  error,
  hasRangeError,
  isLoading,
  isPlaceholderData,
  items,
  params,
  selectedIds,
  selectedVisibleCount,
  onDelete,
  onPageChange,
  onToggleAllVisible,
  onToggleOne,
}: WorkEntriesContentProps) {
  if (hasRangeError) {
    return (
      <ErrorState message="Исправьте период дат, чтобы загрузить записи." />
    );
  }

  if (isLoading) {
    return <LoadingState label="Загрузка журнала..." />;
  }

  if (error) {
    return <ErrorState message={getErrorMessage(error)} />;
  }

  if (!data || items.length === 0) {
    return (
      <EmptyState
        description="Измените фильтр или создайте первую запись."
        title="Записей пока нет"
      />
    );
  }

  return (
    <EntriesContentStack isDimmed={isPlaceholderData} spacing={2}>
      <WorkEntriesTable
        allVisibleSelected={allVisibleSelected}
        editSearch={editSearch}
        items={items}
        selectedIds={selectedIds}
        selectedVisibleCount={selectedVisibleCount}
        onDelete={onDelete}
        onToggleAllVisible={onToggleAllVisible}
        onToggleOne={onToggleOne}
      />
      <Divider />
      <WorkEntriesPagination
        limit={data.limit}
        page={params.page}
        total={data.total}
        onPageChange={onPageChange}
      />
    </EntriesContentStack>
  );
}

const EntriesContentStack = styled(Stack, {
  shouldForwardProp: (prop) => prop !== 'isDimmed',
})<{ isDimmed: boolean }>(({ theme, isDimmed }) => ({
  opacity: isDimmed ? 0.5 : 1,
  pointerEvents: isDimmed ? 'none' : 'auto',
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));
