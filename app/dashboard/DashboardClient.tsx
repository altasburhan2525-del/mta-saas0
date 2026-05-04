'use client';

import { useMemo, useState } from 'react';

const currency = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 });
const today = new Intl.DateTimeFormat('tr-TR').format(new Date());
const translations = {
  tr: { title: 'MT Altaş Hesaplama Merkezi', subtitle: 'Metraj, maliyet, teknik kesit, teklif önizleme ve dijital doğrulamayı tek ekranda yönetin.', calc: 'SaaS Hızlı Özet', preview: 'Canlı Şema', offer: 'Profesyonel Çıktı Önizleme' },
  en: { title: 'MT Altaş Calculation Center', subtitle: 'Manage quantity, cost, technical section, proposal preview and digital verification in one screen.', calc: 'SaaS Quick Summary', preview: 'Live Schema', offer: 'Professional Output Preview' },
  ar: { title: 'مركز حسابات MT Altaş', subtitle: 'إدارة الكميات والتكلفة والمقطع الفني والمعاينة والتحقق الرقمي في شاشة واحدة.', calc: 'ملخص SaaS', preview: 'مخطط مباشر', offer: 'معاينة العرض الاحترافي' }
};
type Lang = keyof typeof translations;

export default function DashboardClient(){
  const [lang, setLang] = useState<Lang>('tr');
  const [project, setProject] = useState('Villa çevre düzenleme');
  const [customer, setCustomer] = useState('Sayın Yetkili');
  const [city, setCity] = useState('Ankara');
  const [area, setArea] = useState(420);
  const [depth, setDepth] = useState(18);
  const [distance, setDistance] = useState(86);
  const [vat, setVat] = useState(20);
  const [fuel, setFuel] = useState(44.8);
  const [cement, setCement] = useState(185);
  const [sand, setSand] = useState(920);
  const t = translations[lang];
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  const data = useMemo(() => {
    const safeArea = Math.max(0, Number(area) || 0);
    const safeDepth = Math.max(1, Number(depth) || 1);
    const safeDistance = Math.max(0, Number(distance) || 0);
    const volume = safeArea * (safeDepth / 100);
    const material = volume * sand + safeArea * 42 + Math.ceil(volume * 2.1) * cement;
    const logistics = safeDistance * fuel * 3.2;
    const labor = safeArea * 260;
    const subtotal = material + logistics + labor;
    const vatAmount = subtotal * ((Number(vat) || 0) / 100);
    const total = subtotal + vatAmount;
    const days = Math.max(1, Math.ceil(safeArea / 85 + safeDistance / 140));
    const code = `MTA-${new Date().getFullYear()}-${String(Math.round(total) % 10000).padStart(4, '0')}`;
    const verifyUrl = `https://app.mtaltasinsaat.com/verify/${code}`;
    return { safeArea, safeDepth, safeDistance, volume, material, logistics, labor, subtotal, vatAmount, total, days, code, verifyUrl };
  }, [area, depth, distance, vat, fuel, cement, sand]);
  const quickStats = [
    { label: 'Toplam Metraj', value: `${data.safeArea.toLocaleString('tr-TR')} m²`, note: `${data.volume.toFixed(1)} m³ hacim` },
    { label: 'Toplam Maliyet', value: currency.format(data.total), note: `KDV dahil ${vat}%` },
    { label: 'Termin Süresi', value: `${data.days} gün`, note: `${city} / ${data.safeDistance} km` },
    { label: 'Takip Kodu', value: data.code, note: 'QR doğrulama hazır' }
  ];
  const offerRows = [
    ['Zemin metraj analizi', `${data.safeArea.toLocaleString('tr-TR')} m²`, currency.format(data.labor)],
    ['Dolgu ve malzeme hesabı', `${data.volume.toFixed(1)} m³`, currency.format(data.material)],
    ['Lojistik planlama', `${Math.max(1, Math.ceil(data.safeDistance / 45))} sefer`, currency.format(data.logistics)],
    ['KDV', `%${vat}`, currency.format(data.vatAmount)]
  ];
  const saveDraft = () => {
    localStorage.setItem('mta_saas_draft', JSON.stringify({project, customer, city, area, depth, distance, vat, fuel, cement, sand, code:data.code, verifyUrl:data.verifyUrl, savedAt:new Date().toISOString()}));
    alert('Taslak ve doğrulama bilgisi kaydedildi.');
  };
  return (
    <>
    <main className="mta-saas-reset" dir={dir}>
      <aside className="mta-saas-sidebar">
        <div className="mta-saas-brand"><span>MT</span><strong>Altaş SaaS</strong></div>
        <a className="mta-new-calc" href="#mta-core-live">+ Yeni Hesaplama</a>
        <nav className="mta-side-nav"><a className="active" href="/dashboard">⌘ Dashboard</a><a href="#mta-core-live">⚙ Core Motor</a><a href="/calculator/core">↗ Core Tam Ekran</a><a href="/embed">⌁ Yayınlama Kodu</a><a href="/dealer">◆ Bayi Yönetimi</a></nav>
        <p className="mta-side-copy">SaaS panel ve gerçek MTA hesap motoru artık aynı ekranda.</p>
      </aside>
      <section className="mta-saas-content">
        <header className="mta-saas-header"><div><span className="mta-eyebrow">Tek Ekran SaaS + Core</span><h1>{t.title}</h1><p>{t.subtitle}</p></div><div className="mta-language-switch">{(['tr','en','ar'] as Lang[]).map((item)=><button className={lang===item?'active':''} key={item} onClick={()=>setLang(item)}>{item.toUpperCase()}</button>)}</div></header>
        <section className="mta-quick-grid">{quickStats.map((item)=>(<article className="mta-stat" key={item.label}><small>{item.label}</small><strong>{item.value}</strong><span>{item.note}</span></article>))}</section>
        <section className="mta-main-grid">
          <div className="mta-panel mta-calculator-panel"><div className="mta-panel-head"><div><h2>{t.calc}</h2><p>Bu alan SaaS özetidir; detaylı gerçek hesap motoru hemen altta aynı ekrana gömüldü.</p></div><span className="mta-live-pill">Tek Sistem</span></div><div className="mta-compact-form"><label>Proje Adı<input value={project} onChange={(e)=>setProject(e.target.value)} /></label><label>Müşteri<input value={customer} onChange={(e)=>setCustomer(e.target.value)} /></label><label>Şehir<select value={city} onChange={(e)=>setCity(e.target.value)}><option>Ankara</option><option>İstanbul</option><option>Antalya</option><option>İzmir</option></select></label><label>Metraj m²<input type="number" value={area} onChange={(e)=>setArea(Number(e.target.value))} /></label><label>Dolgu cm<input type="number" value={depth} onChange={(e)=>setDepth(Number(e.target.value))} /></label><label>Mesafe km<input type="number" value={distance} onChange={(e)=>setDistance(Number(e.target.value))} /></label><label>KDV %<select value={vat} onChange={(e)=>setVat(Number(e.target.value))}><option value="20">20</option><option value="10">10</option><option value="0">0</option></select></label></div><div className="mta-price-card"><h3>Birim Fiyatlar</h3><div className="mta-compact-form prices"><label>Mazot<input type="number" value={fuel} onChange={(e)=>setFuel(Number(e.target.value))} /></label><label>Çimento<input type="number" value={cement} onChange={(e)=>setCement(Number(e.target.value))} /></label><label>Kum m³<input type="number" value={sand} onChange={(e)=>setSand(Number(e.target.value))} /></label></div></div></div>
          <aside className="mta-panel mta-schema-card"><div className="mta-panel-head"><div><h2>{t.preview}</h2><p>{project} için canlı teknik kesit.</p></div><a className="mta-qr" href={data.verifyUrl} target="_blank">QR</a></div><div className="mta-schema-preview"><div className="layer layer-a" style={{height: `${Math.min(80, 28 + data.safeDepth)}px`}}>Kaplama 8 cm</div><div className="layer layer-b" style={{height: `${Math.min(130, 45 + data.safeDepth * 2)}px`}}>Dolgu {data.safeDepth} cm</div><div className="layer layer-c">Stabilize zemin</div><span>{data.safeArea.toLocaleString('tr-TR')} m² • {data.volume.toFixed(1)} m³ • {data.code}</span></div><div className="mta-mini-chart"><i style={{height:`${Math.min(95, 30 + data.material/data.total*70)}%`}}></i><i style={{height:`${Math.min(95, 30 + data.labor/data.total*70)}%`}}></i><i style={{height:`${Math.min(95, 30 + data.logistics/data.total*70)}%`}}></i><i style={{height:`${Math.min(95, 30 + data.vatAmount/data.total*70)}%`}}></i></div></aside>
        </section>
        <section className="mta-panel mta-core-embed-panel" id="mta-core-live"><div className="mta-panel-head"><div><h2>Gerçek MTA Core Hesaplayıcı</h2><p>Yüklenen v21.2 hesap motoru aynı dashboard ekranına bağlandı. Gerekirse tam ekran core sayfası yedek olarak kullanılabilir.</p></div><a className="mta-track" href="/calculator/core">Tam ekran aç</a></div><iframe title="MT Altaş Core Tek Ekran" src="/legacy/mt-altas-hesaplayici.html.html" className="mta-dashboard-core-frame" /></section>
        <section className="mta-panel mta-offer-panel"><div className="mta-panel-head"><div><h2>{t.offer}</h2><p>{project} için PDF öncesi canlı teklif özeti.</p><a className="mta-verify-link" href={data.verifyUrl} target="_blank">Doğrulama linki: {data.verifyUrl}</a></div><strong className="mta-track">{data.code}</strong></div><table className="mta-offer-table"><thead><tr><th>Kalem</th><th>Miktar</th><th>Tutar</th></tr></thead><tbody>{offerRows.map(([item, qty, total])=>(<tr key={item}><td>{item}</td><td>{qty}</td><td>{total}</td></tr>))}<tr><td><strong>Genel Toplam</strong></td><td>{city}</td><td><strong>{currency.format(data.total)}</strong></td></tr></tbody></table></section>
        <div className="mta-fixed-actions"><button onClick={()=>window.print()}>PDF Oluştur</button><button onClick={saveDraft}>Taslak Kaydet</button></div>
      </section>
    </main>
    <section className="mta-print-document"><header className="mta-print-header"><div className="mta-print-logo">MT</div><div><h1>MT Altaş İnşaat</h1><p>Profesyonel Hesaplama ve Teklif Belgesi</p></div><div className="mta-print-qr"><span>QR</span><strong>{data.code}</strong><small>{data.verifyUrl}</small></div></header><div className="mta-print-meta"><div><b>Müşteri</b><span>{customer}</span></div><div><b>Proje</b><span>{project}</span></div><div><b>Şehir</b><span>{city}</span></div><div><b>Tarih</b><span>{today}</span></div></div><div className="mta-print-summary"><div><small>Metraj</small><strong>{data.safeArea.toLocaleString('tr-TR')} m²</strong></div><div><small>Hacim</small><strong>{data.volume.toFixed(1)} m³</strong></div><div><small>Termin</small><strong>{data.days} gün</strong></div><div><small>Genel Toplam</small><strong>{currency.format(data.total)}</strong></div></div><table className="mta-print-table"><thead><tr><th>Hizmet / Ürün</th><th>Miktar</th><th>Tutar</th></tr></thead><tbody>{offerRows.map(([item, qty, total])=>(<tr key={item}><td>{item}</td><td>{qty}</td><td>{total}</td></tr>))}</tbody></table><div className="mta-print-total"><span>Ara Toplam: {currency.format(data.subtotal)}</span><span>KDV: {currency.format(data.vatAmount)}</span><strong>Genel Toplam: {currency.format(data.total)}</strong></div><footer className="mta-print-footer"><p>Bu belge MT Altaş dijital hesaplama altyapısı ile hazırlanmıştır. Doğrulama adresi: {data.verifyUrl}</p><div><b>MT Altaş İnşaat</b><span>Kaşe / İmza</span></div></footer></section>
    </>
  );
}
