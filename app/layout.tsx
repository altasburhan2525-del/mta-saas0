import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MT Altaş SaaS',
  description: 'MTA bayi, teklif ve hesaplama platformu'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
