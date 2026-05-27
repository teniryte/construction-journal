import { EntriesPage } from '@/views/entries/ui/entries-page';

export default function EntriesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <EntriesPage />

      {children}
    </>
  );
}
