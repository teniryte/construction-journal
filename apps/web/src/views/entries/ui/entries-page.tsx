import { Suspense } from 'react';
import { WorkEntriesWidget } from '@/widgets/work-entries';
import { LoadingState, PageShell } from '@/shared/ui';

export function EntriesPage() {
  return (
    <PageShell
      description="Фиксация выполненных работ на строительном объекте."
      title="Журнал работ"
    >
      <Suspense fallback={<LoadingState label="Загрузка журнала..." />}>
        <WorkEntriesWidget />
      </Suspense>
    </PageShell>
  );
}
