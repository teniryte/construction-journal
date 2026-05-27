'use client';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import {
  ConfirmDeleteDialog,
  useDeleteWorkEntriesMutation,
  useDeleteWorkEntryMutation,
} from '@/features/delete-work-entries';
import { WorkEntriesFilter } from '@/features/filter-work-entries';
import { buildWorkEntriesHref } from '../model/use-work-entries-params';
import { useWorkEntrySelection } from '../model/use-work-entry-selection';
import { useWorkEntries } from '../model/use-work-entries';
import { WorkEntriesContent } from './work-entries-content';
import { WorkEntriesSelectionToolbar } from './work-entries-selection-toolbar';

type DeleteTarget = {
  ids: number[];
};

export function WorkEntriesWidget() {
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);
  const searchParams = useSearchParams();
  const {
    data,
    error,
    hasRangeError,
    isLoading,
    isPlaceholderData,
    params,
    resetFilters,
    setDateRange,
    setPage,
    setSort,
  } = useWorkEntries();
  const singleDelete = useDeleteWorkEntryMutation();
  const bulkDelete = useDeleteWorkEntriesMutation();
  const items = useMemo(() => data?.items ?? [], [data?.items]);
  const {
    allVisibleSelected,
    clearSelection,
    selectedCount,
    selectedIds,
    selectedVisibleCount,
    toggleAllVisible,
    toggleOne,
  } = useWorkEntrySelection({ items, params });
  const isDeletePending = singleDelete.isPending || bulkDelete.isPending;
  const deleteError = singleDelete.error ?? bulkDelete.error;
  const editSearch = searchParams.toString();
  const createHref = buildWorkEntriesHref(searchParams, {}, '/entries/create');

  useEffect(() => {
    if (!data) {
      return;
    }

    const lastPage = Math.max(1, Math.ceil(data.total / data.limit));
    if (params.page > lastPage) {
      setPage(lastPage);
    }
  }, [data, params.page, setPage]);

  async function confirmDelete() {
    if (!deleteTarget) {
      return;
    }

    try {
      if (deleteTarget.ids.length === 1) {
        await singleDelete.mutateAsync(deleteTarget.ids[0] as number);
      } else {
        await bulkDelete.mutateAsync(deleteTarget.ids);
      }
    } catch {
      return;
    }

    clearSelection();
    setDeleteTarget(null);
  }

  return (
    <Stack spacing={2}>
      <WorkEntriesFilter
        begin={params.begin}
        end={params.end}
        hasRangeError={hasRangeError}
        sort={params.sort}
        onDateRangeChange={setDateRange}
        onReset={resetFilters}
        onSortChange={setSort}
      />

      <WorkEntriesSelectionToolbar
        createHref={createHref}
        isDeletePending={isDeletePending}
        selectedCount={selectedCount}
        onDeleteSelected={() => setDeleteTarget({ ids: [...selectedIds] })}
      />

      <Card>
        <CardContent>
          <WorkEntriesContent
            allVisibleSelected={allVisibleSelected}
            data={data}
            editSearch={editSearch}
            error={error}
            hasRangeError={hasRangeError}
            isLoading={isLoading}
            isPlaceholderData={isPlaceholderData}
            items={items}
            params={params}
            selectedIds={selectedIds}
            selectedVisibleCount={selectedVisibleCount}
            onDelete={setDeleteTarget}
            onPageChange={setPage}
            onToggleAllVisible={toggleAllVisible}
            onToggleOne={toggleOne}
          />
        </CardContent>
      </Card>

      <ConfirmDeleteDialog
        count={deleteTarget?.ids.length ?? 0}
        error={deleteError}
        isPending={isDeletePending}
        open={Boolean(deleteTarget)}
        onClose={() => {
          if (!isDeletePending) {
            setDeleteTarget(null);
          }
        }}
        onConfirm={confirmDelete}
      />
    </Stack>
  );
}
