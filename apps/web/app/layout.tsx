import { AppProvider } from '@/app/providers/app-provider';
import './globals.css';

export { metadata } from '@/app/config/metadata';

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
