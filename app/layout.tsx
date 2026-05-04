import type { ReactNode } from 'react';

export const metadata = {
  title: 'MT Altaş Hesaplayıcı',
  description: 'MT Altaş Hesaplayıcı SaaS ve embed altyapısı'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="tr">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
