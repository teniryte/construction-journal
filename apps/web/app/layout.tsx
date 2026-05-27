import type { Metadata } from 'next';
import { AppProvider } from '@/app/providers/app-provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Журнал работ',
  description: 'Учет выполненных строительных работ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
