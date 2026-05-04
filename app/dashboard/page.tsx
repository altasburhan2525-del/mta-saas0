const quickStats = [
  { label: 'Toplam Metraj', value: '1.248 m²', note: 'Aktif projelerde ölçülen alan' },
  { label: 'Toplam Maliyet', value: '₺ 3.420.000', note: 'Malzeme + lojistik tahmini' },
  { label: 'Termin Süresi', value: '14 gün', note: 'Planlanan teslim aralığı' },
  { label: 'Takip Kodu', value: 'MTA-2026-0482', note: 'QR doğrulama hazır' }
];

const unitPrices = [
  ['Mazot', '₺44,80', 'Manuel güncel'],
  ['Çimento', '₺185,00', 'Torba'],
  ['Kum', '₺920,00', 'm³'],
  ['Nakliye', '₺38,00', 'km']
];

const offerRows = [
  ['Zemin metraj analizi', '420 m²', '₺486.000'],
  ['Dolgu ve malzeme hesabı', '62 m³', '₺318.400'],
  ['Lojistik planlama', '3 sefer', '₺72.000']
];

export default function DashboardPage(){
  return (
    <main className="mta-saas-reset">
      <aside className="mta-saas-sidebar">
        <div className="mta-saas-brand"><span>MT</span><strong>Altaş SaaS</strong></div>
        <a className="mta-new-calc" href="/calculator">+ Yeni Hesaplama</a>
        <nav className="mta-side-nav">
          <a className="active" href="/dashboard">⌘ Dashboard</a>
          <a href="/dashboard">▦ Projelerim</a>
          <a href="/dashboard">₺ Birim Fiyatlar</a>
          <a href="/embed">⌁ Yayınlama Kodu</a>
          <a href="/dealer">◆ Bayi Yönetimi</a>
        </nav>
        <p className="mta-side-copy">Statik hesaplayıcıyı; kayıt, teklif, QR ve bayi yönetimi için yaşayan bir SaaS paneline dönüştüren yeni kabuk.</p>
      </aside>

      <section className="mta-saas-content">
        <header className="mta-saas-header">
          <div>
            <span className="mta-eyebrow">Profesyonel SaaS Dashboard</span>
            <h1>MT Altaş Hesaplama Merkezi</h1>
            <p>Metraj, maliyet, teknik kesit, teklif önizleme ve dijital doğrulamayı tek ekranda yönetin.</p>
          </div>
          <div className="mta-language-switch" aria-label="Çoklu dil paneli">
            <button>TR</button><button>EN</button><button dir="rtl">AR</button>
          </div>
        </header>

        <section className="mta-quick-grid">
          {quickStats.map((item)=>(
            <article className="mta-stat" key={item.label}>
              <small>{item.label}</small>
              <strong>{item.value}</strong>
              <span>{item.note}</span>
            </article>
          ))}
        </section>

        <section className="mta-main-grid">
          <div className="mta-panel mta-calculator-panel">
            <div className="mta-panel-head">
              <div><h2>Kompakt Hesaplayıcı</h2><p>Input padding düşürüldü, alanlar masaüstü verimliliği için gruplandı.</p></div>
              <span className="mta-live-pill">Canlı</span>
            </div>
            <div className="mta-compact-form">
              <label>Proje Adı<input defaultValue="Villa çevre düzenleme" /></label>
              <label>Şehir<select defaultValue="Ankara"><option>Ankara</option><option>İstanbul</option><option>Antalya</option></select></label>
              <label>Metraj<input defaultValue="420" /></label>
              <label>Birim<select defaultValue="m²"><option>m²</option><option>m³</option><option>mt</option></select></label>
              <label>Mesafe<input defaultValue="86 km" /></label>
              <label>KDV<select defaultValue="20"><option value="20">%20</option><option value="10">%10</option><option value="0">%0</option></select></label>
            </div>
            <div className="mta-price-card">
              <h3>Birim Fiyatlar</h3>
              <table>{unitPrices.map(([name, price, unit])=>(<tr key={name}><td>{name}</td><td>{price}</td><td>{unit}</td></tr>))}</table>
            </div>
          </div>

          <aside className="mta-panel mta-schema-card">
            <div className="mta-panel-head"><div><h2>Canlı Şema</h2><p>Sol form değiştikçe teknik kesit önizlemesi burada güncellenir.</p></div><div className="mta-qr">QR</div></div>
            <div className="mta-schema-preview">
              <div className="layer layer-a">Kaplama 8 cm</div>
              <div className="layer layer-b">Dolgu 18 cm</div>
              <div className="layer layer-c">Stabilize zemin</div>
              <span>420 m² • 62 m³</span>
            </div>
            <div className="mta-mini-chart"><i></i><i></i><i></i><i></i></div>
          </aside>
        </section>

        <section className="mta-panel mta-offer-panel">
          <div className="mta-panel-head">
            <div><h2>Profesyonel Çıktı Önizleme</h2><p>PDF oluşturmadan önce teklif tablosu, takip kodu ve doğrulama alanı görünür.</p></div>
            <strong className="mta-track">MTA-2026-0482</strong>
          </div>
          <table className="mta-offer-table"><thead><tr><th>Kalem</th><th>Miktar</th><th>Tutar</th></tr></thead><tbody>{offerRows.map(([item, qty, total])=>(<tr key={item}><td>{item}</td><td>{qty}</td><td>{total}</td></tr>))}</tbody></table>
        </section>

        <div className="mta-fixed-actions"><a href="/calculator">PDF Oluştur</a><button>Taslak Kaydet</button></div>
      </section>
    </main>
  );
}
