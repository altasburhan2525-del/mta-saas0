import type { ReactNode } from 'react';
import './globals.css';
import './saas-dashboard.css';

export const metadata = {
  title: 'MT Altaş SaaS Dashboard',
  description: 'MT Altaş hesaplama, teklif, QR doğrulama ve bayi yönetim paneli'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
