import { Suspense } from 'react';
import { LoadingState } from '@/shared/ui';
import { EntryCreateDialog } from './entry-create-dialog';

export function EntryCreatePage() {
  return (
    <Suspense fallback={<LoadingState label="Загрузка формы..." />}>
      <EntryCreateDialog />
    </Suspense>
  );
}
