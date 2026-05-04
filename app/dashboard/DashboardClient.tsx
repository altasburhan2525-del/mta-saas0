'use client';

import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';

const MtaCoreDirect = dynamic(() => import('./MtaCoreDirect'), { ssr: false });

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
        <p className="mta-side-copy">Iframe kaldırıldı — core artık doğrudan DOM içinde çalışıyor.</p>
      </aside>

      <section className="mta-saas-content">
        <header className="mta-saas-header">
          <div>
            <span className="mta-eyebrow">Direct DOM Integration</span>
            <h1>{t.title}</h1>
            <p>{t.subtitle}</p>
          </div>
          <div className="mta-language-switch">
            {(['tr','en','ar'] as Lang[]).map((item)=>(
              <button className={lang===item?'active':''} key={item} onClick={()=>setLang(item)}>
                {item.toUpperCase()}
              </button>
            ))}
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

        <section className="mta-panel" id="mta-core-live">
          <div className="mta-panel-head">
            <div>
              <h2>🔥 GERÇEK MTA CORE (iframe yok)</h2>
              <p>Artık hesap motoru React dışında değil, doğrudan DOM içinde çalışıyor.</p>
            </div>
          </div>

          <MtaCoreDirect />
        </section>

        <section className="mta-panel mta-offer-panel">
          <div className="mta-panel-head">
            <div>
              <h2>{t.offer}</h2>
              <a className="mta-verify-link" href={data.verifyUrl} target="_blank">{data.verifyUrl}</a>
            </div>
            <strong className="mta-track">{data.code}</strong>
          </div>

          <table className="mta-offer-table">
            <thead>
              <tr><th>Kalem</th><th>Miktar</th><th>Tutar</th></tr>
            </thead>
            <tbody>
              {offerRows.map(([item, qty, total])=>(
                <tr key={item}><td>{item}</td><td>{qty}</td><td>{total}</td></tr>
              ))}
            </tbody>
          </table>
        </section>

        <div className="mta-fixed-actions">
          <button onClick={()=>window.print()}>PDF</button>
          <button onClick={saveDraft}>Kaydet</button>
        </div>
      </section>
    </main>
    </>
  );
}
