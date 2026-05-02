'use client';

import { useMemo, useState } from 'react';
import { calculateOffer, money } from '@/lib/calc/mtaCalcCore';
import { useMtaLang } from '@/lib/i18n/useMtaLang';
import { LANG_META } from '@/lib/i18n/dictionaries';
import { downloadProposal } from '@/lib/pdf/proposalPdf';

const quickNav = [['⌂', 'Dashboard'], ['◫', 'Hesaplayıcı'], ['₺', 'Fiyat Listesi']] as const;
const opsNav = [['▦', 'Projelerim'], ['✦', 'Teklif Hazırla'], ['☎', 'Destek / WhatsApp']] as const;

function vehicleAdvice(pallets: number) {
  if (pallets <= 16) return 'Bu miktar için 1 adet kamyonet / küçük araç yeterli olabilir.';
  if (pallets <= 26) return 'Bu miktar için 1 adet onteker araç önerilir.';
  if (pallets <= 40) return 'Bu miktar için 1 adet 40’lık tır önerilir.';
  if (pallets <= 80) return 'Bu miktar için 2 adet 40’lık tır önerilir.';
  return 'Bu miktar için parça sevkiyat veya çoklu tır planı önerilir.';
}

export default function MtaSaasApp() {
  const { lang, setLang, T, langs, meta } = useMtaLang();
  const [area, setArea] = useState(100);
  const [unitPrice, setUnitPrice] = useState(350);
  const [laborPrice, setLabor] = useState(5000);
  const [shipping, setShipping] = useState(3500);
  const [vatRate, setVatRate] = useState(0.2);
  const [pallets, setPallets] = useState(40);
  const [tonnage, setTonnage] = useState(100);
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
        <div className="mta-brand"><div className="mta-brand-mark">MT</div><div><b>MT Altaş</b><span>Pro Hesaplayıcı</span></div></div>
        <MenuGroup title="Hızlı Erişim" items={quickNav} active="Dashboard" />
        <MenuGroup title="Operasyonel" items={opsNav} />
        <div className="mta-plan-card"><small>Aktif Paket</small><b>Premium Panel</b><p>Teklif, metraj ve PDF çıktıları hazır.</p></div>
      </aside>

      <section className="mta-workspace">
        <header className="mta-topbar">
          <div><b>Teklif ve Maliyet Paneli</b><span>Canlı hesaplama • Kurumsal çıktı • SEO bilgi katmanı</span></div>
          <div className="mta-top-actions"><select value={lang} onChange={(e) => setLang(e.target.value as any)}>{langs.map((l) => <option key={l} value={l}>{LANG_META[l].flag} {LANG_META[l].name}</option>)}</select><button onClick={() => downloadProposal(lang, result)} className="mta-btn primary">PDF İndir</button></div>
        </header>

        <section className="mta-hero-pro"><div><span>MT Altaş Pro Dashboard</span><h1>{T('title')}</h1><p>{T('sub')}</p></div><div className="mta-hero-total"><small>Genel Toplam</small><b>{money(result.total, locale)}</b></div></section>

        <section className="mta-kpis"><Kpi label="Toplam Maliyet" value={money(result.total, locale)} note="KDV dahil" /><Kpi label="KDV" value={money(result.vat, locale)} note={`${vatPercent}% oran`} /><Kpi label="Nakliye" value={money(shipping, locale)} note="Lojistik kalemi" /><Kpi label="m² Maliyet" value={money(m2Cost, locale)} note={`${area} m² üzerinden`} /></section>

        <div className="mta-content-grid">
          <section className="mta-card mta-form-card"><CardTitle title="Hesaplayıcı Merkezi" sub="Metraj, işçilik, nakliye ve vergi kalemleri tek merkezde yönetilir." live /><div className="mta-section-title">1. Kaba / Ana Hesap</div><div className="mta-form-grid"><Field label={T('area')} value={area} setValue={setArea}/><Field label={T('unit')} value={unitPrice} setValue={setUnitPrice}/><Field label={T('labor')} value={laborPrice} setValue={setLabor}/></div><InfoNote text="Tonaj ve metraj hesaplamaları; malzeme yoğunluğu, fire payı ve saha uygulama koşulları dikkate alınarak tekliflendirme için ön analiz sağlar." /><div className="mta-section-title">2. Nakliye ve Vergi</div><div className="mta-form-grid"><Field label={T('shipping')} value={shipping} setValue={setShipping}/><Field label={T('vat')} value={vatRate*100} setValue={(v)=>setVatRate(v/100)}/></div></section>

          <aside className="mta-card mta-summary"><CardTitle title="Proje Özeti" sub="Ana maliyet kırılımı" /><div className="mta-chart"><div style={{height:`${chartA}%`}}/><div style={{height:`${chartB}%`}}/><div style={{height:`${chartC}%`}}/><strong>{vatPercent}%</strong></div><Legend label="Metraj"/><Legend label="Birim fiyat"/><Legend label="İşçilik"/><div className="mta-stock-badge">Stokta hazır: 5.000 m² kilit taşı</div></aside>

          <section className="mta-card"><CardTitle title="Akıllı Nakliye Optimizasyonu" sub="Palet ve tonaja göre araç önerisi" /><div className="mta-route"><span>Başlangıç</span><i/><b>Varış</b></div><div className="mta-form-grid"><Field label="Palet Sayısı" value={pallets} setValue={setPallets}/><Field label="Tonaj" value={tonnage} setValue={setTonnage}/></div><div className="mta-advice"><b>Araç Önerisi</b><p>{vehicleAdvice(pallets)}</p></div><InfoNote text="Nakliye önerisi palet sayısı üzerinden ön planlama sağlar; kesin sevkiyat için araç hacmi, tonaj limiti ve güzergâh kontrol edilmelidir." /></section>

          <aside className="mta-total-panel"><small>Toplam Tahmini Maliyet</small><b>{money(result.total,locale)}</b><div className="mta-price-mini"><span>Mazot Endeksi</span><strong>Manuel güncel</strong><p>İl bazlı nakliye katsayısı sonraki sürümde otomatik bağlanabilir.</p></div><button onClick={() => downloadProposal(lang, result)} className="mta-btn primary wide">PDF Olarak İndir</button><button className="mta-btn ghost wide">Müşteri Teklifi Oluştur</button></aside>
        </div>
      </section>
    </main>
  );
}

function MenuGroup({title,items,active}:{title:string;items:readonly (readonly [string,string])[];active?:string}){return <div className="mta-menu-group"><small>{title}</small><nav className="mta-nav">{items.map(([icon,label])=><span key={label} className={label===active?'active':''}><i>{icon}</i>{label}</span>)}</nav></div>}
function Field({ label, value, setValue }: { label: string; value: number; setValue: (v: number) => void }) {const invalid=value<0;return <label className={`mta-field ${invalid?'is-invalid':''}`}><span>{label}</span><input type="number" value={value} onChange={(e)=>setValue(Number(e.target.value))}/>{invalid&&<em>Negatif değer girilemez.</em>}</label>;}
function Legend({label}:{label:string}){return <div className="mta-legend"><span/> {label}</div>}
function Kpi({label,value,note}:{label:string;value:string;note:string}){return <article className="mta-kpi"><span>{label}</span><b>{value}</b><small>{note}</small></article>}
function CardTitle({title,sub,live}:{title:string;sub:string;live?:boolean}){return <div className="mta-card-title"><div><h2>{title}</h2><p>{sub}</p></div>{live && <em>Canlı</em>}</div>}
function InfoNote({text}:{text:string}){return <div className="mta-info-note">{text}</div>}
