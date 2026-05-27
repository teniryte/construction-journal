import { EntryEditPage } from '@/views/entry-edit/ui/entry-edit-page';

type EntryEditRouteProps = {
  params: Promise<{ id: string }>;
};

export default async function EntryEditRoute({ params }: EntryEditRouteProps) {
  const { id } = await params;

  return <EntryEditPage entryId={id} />;
}
