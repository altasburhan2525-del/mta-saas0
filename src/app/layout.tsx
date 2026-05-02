import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MT Altaş SaaS Hesaplayıcı',
  description: '6 dilli teklif ve hesaplama yazılımı',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
