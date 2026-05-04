import Link from 'next/link';

export default function CalculatorPage(){
  return (
    <main className="mta-home-page">
      <section className="mta-home-hero">
        <div className="mta-home-nav">
          <div className="mta-saas-brand"><span>MT</span><strong>Altaş Hesaplayıcı</strong></div>
          <Link href="/dashboard" className="mta-home-login">Dashboard'a Dön</Link>
        </div>
        <div className="mta-home-content">
          <span className="mta-eyebrow">MTA Core Motor Bağlantısı</span>
          <h1>Hesaplayıcı modülü bağlanmaya hazır.</h1>
          <p>Yüklediğin tek parça HTML, SaaS içinde legacy/core motor olarak ayrılacak. Bir sonraki adımda bu sayfanın içine gerçek MTA hesaplayıcı gömülecek ve dashboard teklif/PDF akışına bağlanacak.</p>
          <div className="mta-home-actions">
            <Link href="/dashboard">Panele Dön</Link>
            <Link href="/verify/demo">Doğrulama Demo</Link>
          </div>
        </div>
        <div className="mta-home-card">
          <div><small>Core Root</small><strong>mta11</strong></div>
          <div><small>Sürüm</small><strong>v21.2</strong></div>
          <div><small>Durum</small><strong>Hazır</strong></div>
        </div>
      </section>
    </main>
  );
}
