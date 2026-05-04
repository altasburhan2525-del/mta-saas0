const features = [
  ['Canlı Hesaplama', 'Metraj, maliyet, termin ve lojistik özetini tek ekranda yönetin.'],
  ['Teklif Önizleme', 'PDF öncesi profesyonel teklif tablosunu ve takip kodunu kontrol edin.'],
  ['Bayi SaaS Altyapısı', 'Projelerim, birim fiyatlar ve yayınlama kodu için kurumsal başlangıç paneli.']
];

export default function HomePage() {
  return (
    <main className="mta-home-page">
      <section className="mta-home-hero">
        <div className="mta-home-nav">
          <div className="mta-saas-brand"><span>MT</span><strong>Altaş SaaS</strong></div>
          <a href="/dashboard" className="mta-home-login">Panele Giriş</a>
        </div>
        <div className="mta-home-content">
          <span className="mta-eyebrow">MT Altaş İnşaat Dijital Platform</span>
          <h1>Hesaplayıcı artık yaşayan bir SaaS paneli.</h1>
          <p>Metraj, malzeme, lojistik, teklif çıktısı ve QR doğrulama süreçlerini app.mtaltasinsaat.com üzerinde tek merkezden yönetin.</p>
          <div className="mta-home-actions">
            <a href="/dashboard">Dashboard Aç</a>
            <a href="/calculator">Hesaplayıcıya Git</a>
          </div>
        </div>
        <div className="mta-home-card">
          <div><small>Toplam Metraj</small><strong>1.248 m²</strong></div>
          <div><small>Toplam Maliyet</small><strong>₺3.42M</strong></div>
          <div><small>Takip Kodu</small><strong>MTA-2026</strong></div>
        </div>
      </section>

      <section className="mta-home-features">
        {features.map(([title, text]) => (
          <article key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
