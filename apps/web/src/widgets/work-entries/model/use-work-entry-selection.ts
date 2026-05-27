import { useMemo, useState } from 'react';
import type { WorkEntry } from '@construction-journal/shared';
import type { WorkEntriesListParams } from '@/entities/work-entries';

type SelectionState = {
  key: string;
  ids: Set<number>;
};

export function useWorkEntrySelection({
  items,
  params,
}: {
  items: WorkEntry[];
  params: WorkEntriesListParams;
}) {
  const [selection, setSelection] = useState<SelectionState>({
    key: '',
    ids: new Set(),
  });
  const visibleIds = useMemo(() => items.map((entry) => entry.id), [items]);
  const selectionKey = useMemo(
    () =>
      [
        params.begin ?? '',
        params.end ?? '',
        params.sort,
        params.page,
        visibleIds.join(','),
      ].join('|'),
    [params.begin, params.end, params.page, params.sort, visibleIds],
  );
  const selectedIds =
    selection.key === selectionKey ? selection.ids : new Set<number>();
  const selectedCount = selectedIds.size;
  const selectedVisibleCount = visibleIds.filter((id) =>
    selectedIds.has(id),
  ).length;
  const allVisibleSelected =
    visibleIds.length > 0 && selectedVisibleCount === visibleIds.length;

  function toggleOne(id: number) {
    setSelection((current) => {
      const next = new Set(
        current.key === selectionKey ? current.ids : undefined,
      );
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return { key: selectionKey, ids: next };
    });
  }

  function toggleAllVisible() {
    setSelection((current) => {
      const next = new Set(
        current.key === selectionKey ? current.ids : undefined,
      );
      if (allVisibleSelected) {
        visibleIds.forEach((id) => next.delete(id));
      } else {
        visibleIds.forEach((id) => next.add(id));
      }
      return { key: selectionKey, ids: next };
    });
  }

  function clearSelection() {
    setSelection({ key: selectionKey, ids: new Set() });
  }

  return {
    allVisibleSelected,
    clearSelection,
    selectedCount,
    selectedIds,
    selectedVisibleCount,
    toggleAllVisible,
    toggleOne,
  };
}
