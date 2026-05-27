import { Suspense } from 'react';
import { LoadingState } from '@/shared/ui';
import { EntryEditDialog } from './entry-edit-dialog';

type EntryEditPageProps = {
  entryId: string;
};

export function EntryEditPage({ entryId }: EntryEditPageProps) {
  return (
    <Suspense fallback={<LoadingState label="Загрузка формы..." />}>
      <EntryEditDialog entryId={entryId} />
    </Suspense>
  );
}
