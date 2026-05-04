import type { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'MT Altaş SaaS Dashboard',
  description: 'Metraj ve maliyet analiz paneli'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
