import type { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'MT Altaş Hesaplayıcı',
  description: 'Premium SaaS teklif ve hesaplama altyapısı'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <div className="mt-page">
          <div className="mt-container">
            <div className="mt-nav">
              <div className="mt-brand">MT Altaş Hesaplayıcı</div>
              <div className="mt-actions">
                <a href="/dashboard" className="mt-btn secondary">Panel</a>
                <a href="/calculator" className="mt-btn">Hesapla</a>
              </div>
            </div>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
