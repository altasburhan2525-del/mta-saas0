export default function DashboardPage(){
  const rows = [
    ['Villa çevre düzenleme','Metraj analizi','MTA-2026-001','₺486.000'],
    ['Depo zemin hazırlığı','Lojistik + dolgu','MTA-2026-002','₺318.400'],
    ['Bahçe peyzaj işi','Teklif taslağı','MTA-2026-003','₺72.000']
  ];
  return (
    <main className="dashboard-shell">
      <aside className="sidebar">
        <div className="brand"><strong>MT Altaş</strong><span>Analiz Yazılımı</span></div>
        <nav>
          <a className="active">Gösterge Paneli</a>
          <a>Hesaplama Analizi</a>
          <a>Teklifler</a>
          <a>Projelerim</a>
          <a>Birim Fiyatlar</a>
          <a>Ayarlar</a>
        </nav>
        <button className="outline-btn">Yeni Hesaplama</button>
        <div className="user-box"><span>BA</span><div><b>Burhan Altaş</b><small>Yönetici</small></div></div>
      </aside>
      <section className="content">
        <header className="topbar">
          <div><h1>Metraj ve Maliyet Analizi</h1><p>İnşaat, nakliye, malzeme ve teklif süreçlerini tek ekranda takip edin.</p></div>
          <a className="primary-btn" href="/calculator/core">Hesaplayıcıyı Aç</a>
        </header>
        <section className="stats-grid">
          <article><small>Toplam Metraj</small><strong>1.248 m²</strong><span>Bu ay 12 proje</span></article>
          <article><small>Toplam Maliyet</small><strong>₺3.420.000</strong><span>KDV dahil tahmini</span></article>
          <article><small>Teklif Sayısı</small><strong>28</strong><span>7 teklif bekliyor</span></article>
          <article><small>Ortalama Termin</small><strong>14 gün</strong><span>Saha planlama</span></article>
        </section>
        <section className="main-grid">
          <article className="card chart-card">
            <h2>Gelir ve Giderler</h2>
            <div className="chart-area"><div className="line blue"></div><div className="line green"></div><div className="axis"><span>Şub 26</span><span>Mar 26</span><span>Nis 26</span><span>May 26</span></div></div>
            <div className="legend"><span><i className="blue-dot"></i>Toplam Gelir</span><span><i className="green-dot"></i>Toplam Gider</span></div>
          </article>
          <article className="card donut-card">
            <h2>Maliyet Dağılımı</h2>
            <div className="donut"></div>
            <ul><li><span className="b"></span>Malzeme <b>45%</b></li><li><span className="g"></span>Nakliye <b>25%</b></li><li><span className="y"></span>İşçilik <b>20%</b></li><li><span className="r"></span>KDV <b>10%</b></li></ul>
          </article>
        </section>
        <section className="card table-card">
          <div className="card-head"><h2>Son Hesaplamalar</h2><div><button>Tümü</button><button>En yeniler</button></div></div>
          <table><thead><tr><th>Proje</th><th>Analiz</th><th>Takip Kodu</th><th>Tutar</th></tr></thead><tbody>{rows.map((r)=><tr key={r[2]}><td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td className="money">{r[3]}</td></tr>)}</tbody></table>
        </section>
      </section>
    </main>
  );
}
