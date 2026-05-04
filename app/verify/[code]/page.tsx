type VerifyPageProps = {
  params: Promise<{ code: string }>;
};

export default async function VerifyPage({ params }: VerifyPageProps){
  const { code } = await params;
  const safeCode = decodeURIComponent(code || '').replace(/[^A-Z0-9-]/gi, '').toUpperCase();

  return (
    <main className="mta-home-page">
      <section className="mta-home-hero">
        <div className="mta-home-nav">
          <div className="mta-saas-brand"><span>MT</span><strong>Altaş Doğrulama</strong></div>
          <a href="/dashboard" className="mta-home-login">Dashboard</a>
        </div>
        <div className="mta-home-content">
          <span className="mta-eyebrow">Dijital Teklif Doğrulama</span>
          <h1>Teklif doğrulama kaydı hazır.</h1>
          <p>Bu sayfa, MT Altaş SaaS üzerinden oluşturulan tekliflerin takip kodu ile doğrulanması için hazırlanmıştır. Veritabanı bağlantısı eklendiğinde müşteri, teklif özetini burada canlı olarak görecektir.</p>
          <div className="mta-home-actions">
            <a href="/dashboard">Yeni Hesaplama</a>
            <a href="/calculator/core">Core Motor</a>
          </div>
        </div>
        <div className="mta-home-card">
          <div><small>Takip Kodu</small><strong>{safeCode || 'MTA-DEMO'}</strong></div>
          <div><small>Durum</small><strong>Doğrulanabilir</strong></div>
          <div><small>Kaynak</small><strong>MT Altaş SaaS</strong></div>
        </div>
      </section>
      <section className="mta-home-features">
        <article><h2>Teklif Kodu</h2><p>Her teklif için benzersiz takip kodu üretildiğinde bu sayfa doğrulama ekranı olarak çalışır.</p></article>
        <article><h2>Müşteri Güveni</h2><p>PDF içindeki QR veya link bu sayfaya yönlenir ve belgenin MT Altaş altyapısından üretildiğini gösterir.</p></article>
        <article><h2>Sonraki Aşama</h2><p>Proje kayıt sistemi bağlanınca toplam, KDV, müşteri ve tarih bilgileri burada otomatik görünür.</p></article>
      </section>
    </main>
  );
}
