'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { WorkEntryForm } from '@/features/manage-work-entry';
import { buildWorkEntriesHref } from '@/widgets/work-entries';
import { RouteDialog } from '@/shared/ui';

export function EntryCreateDialog() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const close = () => router.replace(buildWorkEntriesHref(searchParams));

  const handleSaved = () => {
    router.replace(buildWorkEntriesHref(searchParams, { page: 1 }));
  };

  return (
    <RouteDialog title="Новая запись" onClose={close}>
      <WorkEntryForm mode="create" onCancel={close} onSaved={handleSaved} />
    </RouteDialog>
  );
}
