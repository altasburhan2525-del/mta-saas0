'use client';

import { useMemo, useState } from 'react';
import { calculateOffer, money } from '@/lib/calc/mtaCalcCore';
import { useMtaLang } from '@/lib/i18n/useMtaLang';
import { LANG_META } from '@/lib/i18n/dictionaries';
import { downloadProposal } from '@/lib/pdf/proposalPdf';

const navItems = [
  ['⌂', 'Ana Panel'],
  ['▦', 'Proje Yönetimi'],
  ['◫', 'Metraj ve Maliyet'],
  ['▣', 'Malzeme Takibi'],
  ['⇄', 'Nakliye ve Lojistik'],
  ['✦', 'Teklif Oluştur'],
  ['⚙', 'Ayarlar'],
] as const;

export default function MtaSaasApp() {
  const { lang, setLang, T, langs, meta } = useMtaLang();
  const [area, setArea] = useState(100);
  const [unitPrice, setUnitPrice] = useState(350);
  const [laborPrice, setLabor] = useState(5000);
  const [shipping, setShipping] = useState(3500);
  const [vatRate, setVatRate] = useState(0.2);
  const result = useMemo(() => calculateOffer({ area, unitPrice, laborPrice, shipping, vatRate }), [area, unitPrice, laborPrice, shipping, vatRate]);
  const locale = meta.locale;
  const m2Cost = area > 0 ? result.total / area : 0;
  const vatPercent = Math.round(vatRate * 100);
  const chartA = Math.max(10, Math.min(92, Math.round((area / 250) * 100)));
  const chartB = Math.max(10, Math.min(92, Math.round((unitPrice / 800) * 100)));
  const chartC = Math.max(10, Math.min(92, Math.round((laborPrice / 12000) * 100)));

  return (
    <main className="mta-shell" dir={meta.dir}>
      <aside className="mta-sidebar">
        <div className="mta-brand">
          <div className="mta-brand-mark">MT</div>
          <div><b>MT Altaş</b><span>Pro Hesaplayıcı</span></div>
        </div>
        <nav className="mta-nav">
          {navItems.map(([icon, label], i) => <span key={label} className={i === 0 ? 'active' : ''}><i>{icon}</i>{label}</span>)}
        </nav>
        <div className="mta-plan-card"><small>Aktif Paket</small><b>Premium Panel</b><p>Teklif, metraj ve PDF çıktıları hazır.</p></div>
      </aside>

      <section className="mta-workspace">
        <header className="mta-topbar">
          <div><b>Teklif ve Maliyet Paneli</b><span>Canlı hesaplama • Kurumsal çıktı</span></div>
          <div className="mta-top-actions">
            <select value={lang} onChange={(e) => setLang(e.target.value as any)}>{langs.map((l) => <option key={l} value={l}>{LANG_META[l].flag} {LANG_META[l].name}</option>)}</select>
            <button onClick={() => downloadProposal(lang, result)} className="mta-btn primary">PDF İndir</button>
          </div>
        </header>

        <section className="mta-hero-pro">
          <div><span>MT Altaş Pro Dashboard</span><h1>{T('title')}</h1><p>{T('sub')}</p></div>
          <div className="mta-hero-total"><small>Genel Toplam</small><b>{money(result.total, locale)}</b></div>
        </section>

        <section className="mta-kpis">
          <Kpi label="Toplam Maliyet" value={money(result.total, locale)} note="KDV dahil" />
          <Kpi label="KDV" value={money(result.vat, locale)} note={`${vatPercent}% oran`} />
          <Kpi label="Nakliye" value={money(shipping, locale)} note="Lojistik kalemi" />
          <Kpi label="m² Maliyet" value={money(m2Cost, locale)} note={`${area} m² üzerinden`} />
        </section>

        <div className="mta-content-grid">
          <section className="mta-card mta-form-card">
            <CardTitle title="Proje Metrajı ve Maliyet Hesaplama" sub="Değerleri değiştir, toplam maliyet ve PDF çıktısı otomatik güncellensin." live />
            <div className="mta-section-title">1. Kaba / Ana Hesap</div>
            <div className="mta-form-grid"><Field label={T('area')} value={area} setValue={setArea}/><Field label={T('unit')} value={unitPrice} setValue={setUnitPrice}/><Field label={T('labor')} value={laborPrice} setValue={setLabor}/></div>
            <div className="mta-section-title">2. Nakliye ve Vergi</div>
            <div className="mta-form-grid"><Field label={T('shipping')} value={shipping} setValue={setShipping}/><Field label={T('vat')} value={vatRate*100} setValue={(v)=>setVatRate(v/100)}/></div>
          </section>

          <aside className="mta-card mta-summary">
            <CardTitle title="Proje Özeti" sub="Ana maliyet kırılımı" />
            <div className="mta-chart"><div style={{height:`${chartA}%`}}/><div style={{height:`${chartB}%`}}/><div style={{height:`${chartC}%`}}/><strong>{vatPercent}%</strong></div>
            <Legend label="Metraj"/><Legend label="Birim fiyat"/><Legend label="İşçilik"/>
          </aside>

          <section className="mta-card">
            <CardTitle title="Nakliye ve Lojistik" sub="Sefer ve taşıma bilgileri" />
            <div className="mta-route"><span>Başlangıç</span><i/><b>Varış</b></div>
            <div className="mta-form-grid"><Field label="Palet Sayısı" value={40} setValue={()=>{}}/><Field label="Tonaj" value={100} setValue={()=>{}}/></div>
          </section>

          <aside className="mta-total-panel">
            <small>Toplam Tahmini Maliyet</small><b>{money(result.total,locale)}</b>
            <button onClick={() => downloadProposal(lang, result)} className="mta-btn primary wide">PDF Olarak İndir</button>
            <button className="mta-btn ghost wide">Müşteri Teklifi Oluştur</button>
          </aside>
        </div>
      </section>
    </main>
  );
}

function Field({ label, value, setValue }: { label: string; value: number; setValue: (v: number) => void }) {return <label className="mta-field"><span>{label}</span><input type="number" value={value} onChange={(e)=>setValue(Number(e.target.value))}/></label>;}
function Legend({label}:{label:string}){return <div className="mta-legend"><span/> {label}</div>}
function Kpi({label,value,note}:{label:string;value:string;note:string}){return <article className="mta-kpi"><span>{label}</span><b>{value}</b><small>{note}</small></article>}
function CardTitle({title,sub,live}:{title:string;sub:string;live?:boolean}){return <div className="mta-card-title"><div><h2>{title}</h2><p>{sub}</p></div>{live && <em>Canlı</em>}</div>}
