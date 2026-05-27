'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { WorkEntryForm } from '@/features/manage-work-entry';
import { buildWorkEntriesHref } from '@/widgets/work-entries';
import { RouteDialog } from '@/shared/ui';

type EntryEditDialogProps = {
  entryId: string;
};

export function EntryEditDialog({ entryId }: EntryEditDialogProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const close = () => router.replace(buildWorkEntriesHref(searchParams));

  return (
    <RouteDialog title="Редактирование записи" onClose={close}>
      <WorkEntryForm
        entryId={entryId}
        mode="edit"
        onCancel={close}
        onSaved={close}
      />
    </RouteDialog>
  );
}
