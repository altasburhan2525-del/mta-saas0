export default function CalculatorCorePage(){
  return (
    <main className="mta-home-page">
      <section className="mta-home-hero">
        <div className="mta-home-nav">
          <div className="mta-saas-brand"><span>MT</span><strong>MTA Core</strong></div>
          <a href="/dashboard" className="mta-home-login">Dashboard'a Dön</a>
        </div>
        <div className="mta-home-content">
          <span className="mta-eyebrow">MTA v21.2 Core Bridge</span>
          <h1>Core hesap motoru için güvenli bağlantı katmanı.</h1>
          <p>Yüklenen MTA HTML çekirdeği, bu route altında SaaS platformuna bağlanacak. Bu sayfa core modül, PDF/teklif ve doğrulama sistemi arasında köprü görevi görür.</p>
          <div className="mta-home-actions">
            <a href="/dashboard">Dashboard</a>
            <a href="/calculator">Hesaplayıcı Giriş</a>
          </div>
        </div>
        <div className="mta-home-card">
          <div><small>Core ID</small><strong>mta11</strong></div>
          <div><small>İmza</small><strong>v21.2</strong></div>
          <div><small>Bağlantı</small><strong>Aktif</strong></div>
        </div>
      </section>
    </main>
  );
}
