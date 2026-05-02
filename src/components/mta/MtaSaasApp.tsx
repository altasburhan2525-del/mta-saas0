'use client';

import { useMemo, useState, useEffect } from 'react';
import { calculateOffer, money } from '@/lib/calc/mtaCalcCore';
import { useMtaLang } from '@/lib/i18n/useMtaLang';
import { LANG_META } from '@/lib/i18n/dictionaries';
import { downloadProposal } from '@/lib/pdf/proposalPdf';
import { createOfferNo, saveProject, readProjects, type SavedProject } from '@/lib/storage/projects';
import { MTA_V21_SOURCE_SIGNATURE } from '@/lib/mta-v21/migrationNotes';
import MtaProductSelector from './MtaProductSelector';
import MtaMultiProductPanel from './MtaMultiProductPanel';
import { getProductById, estimateProductLogistics } from '@/lib/products/mtaProducts';

const quickNav = [['⌂', 'Dashboard', ''], ['◫', 'Yeni Analiz', ''], ['▣', 'Kütüphane', '3']] as const;
const opsNav = [['▦', 'Projelerim', ''], ['✦', 'Teklif Hazırla', ''], ['☎', 'Uzmandan Doğrulama', '1']] as const;
function vehicleAdvice(pallets: number) { if (pallets <= 16) return 'Bu miktar için 1 adet kamyonet / küçük araç yeterli olabilir.'; if (pallets <= 26) return 'Bu miktar için 1 adet onteker araç önerilir.'; if (pallets <= 40) return 'Bu miktar için 1 adet 40’lık tır önerilir.'; if (pallets <= 80) return 'Bu miktar için 2 adet 40’lık tır önerilir.'; return 'Bu miktar için parça sevkiyat veya çoklu tır planı önerilir.'; }
function fuelEstimate(distance: number, fuelPrice: number, vehicle: string) { const rate = vehicle === 'tır' ? 32 : vehicle === 'onteker' ? 24 : 14; return (distance / 100) * rate * fuelPrice; }
export default function MtaSaasApp() {
  const { lang, setLang, T, langs, meta } = useMtaLang();
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false); const [isDark, setIsDark] = useState(false); const [savedProjects, setSavedProjects] = useState<SavedProject[]>([]); const [offerNo, setOfferNo] = useState(createOfferNo());
  const [selectedProductId, setSelectedProductId] = useState('kilit-tasi-6cm');
  const selectedProduct = getProductById(selectedProductId);
  const [area, setArea] = useState(100); const [unitPrice, setUnitPrice] = useState(selectedProduct.unitPrice); const [laborPrice, setLabor] = useState(5000); const [shipping, setShipping] = useState(3500); const [vatRate, setVatRate] = useState(0.2); const [customer, setCustomer] = useState('Örnek Müşteri'); const [project, setProject] = useState('Kilit taşı uygulaması'); const [distance, setDistance] = useState(320); const [fuelPrice, setFuelPrice] = useState(45); const [vehicle, setVehicle] = useState('tır'); const [siteNote, setSiteNote] = useState('Şantiye keşfi sonrası nihai miktarlar doğrulanacaktır.');
  const logistics = estimateProductLogistics(selectedProduct, area);
  const pallets = logistics.palletCount || 40;
  const tonnage = Math.round((logistics.tonnage || 100) * 10) / 10;
  const result = useMemo(() => calculateOffer({ area, unitPrice, laborPrice, shipping, vatRate }), [area, unitPrice, laborPrice, shipping, vatRate]);
  const locale = meta.locale; const m2Cost = area > 0 ? result.total / area : 0; const fuelCost = fuelEstimate(distance, fuelPrice, vehicle); const checkup = Math.round((m2Cost / 420) * 100);
  useEffect(()=>{setSavedProjects(readProjects())},[]);
  useEffect(()=>{setUnitPrice(selectedProduct.unitPrice)},[selectedProduct.unitPrice]);
  function handleSaveProject(){ const saved = saveProject({ id: Date.now().toString(), offerNo, customer, project: `${project} / ${selectedProduct.name}`, area, unitPrice, laborPrice, shipping, vatRate, total: result.total, createdAt: new Date().toISOString() }); setSavedProjects(saved); setOfferNo(createOfferNo()); }
  const whatsAppText = encodeURIComponent(`MT Altaş ürün analiz talebi\nTeklif No: ${offerNo}\nÜrün: ${selectedProduct.name}\nMüşteri: ${customer}\nProje: ${project}\nToplam: ${money(result.total, locale)}\nPalet: ${pallets}\nTonaj: ${tonnage}`);
  return (<main id="mta11-smart-calc-root" data-mta-sign={MTA_V21_SOURCE_SIGNATURE} data-mta-vat-rate="0.20" data-mta-next-bridge="v21.2-to-saas" className={`mta-shell mta-clean-ui ${isSidebarCollapsed ? 'is-sidebar-collapsed' : ''} ${isDark ? 'mta-dark-mode' : ''}`} dir={meta.dir}>
    <aside className="mta-sidebar"><button className="mta-sidebar-toggle" onClick={() => setSidebarCollapsed(!isSidebarCollapsed)} aria-label="Menüyü daralt veya genişlet">{isSidebarCollapsed ? '›' : '‹'}</button><div className="mta-brand"><div className="mta-brand-mark">MT</div><div className="mta-brand-text"><b>MT Altaş</b><span>İnşaat Hesap Platformu</span></div></div><MenuGroup title="Ana Menü" items={quickNav} active="Dashboard" /><MenuGroup title="Eylemler" items={opsNav} /><a className="mta-support" href={`https://wa.me/905000000000?text=${whatsAppText}`} target="_blank">WhatsApp Teklifi</a><div className="mta-plan-card"><small>Aktif Modül</small><b>Ürün Analizi</b><p>Sade tasarım modu aktif.</p></div></aside>
    <section className="mta-workspace"><header className="mta-topbar"><div><b>İnşaat Ürün Analiz Paneli</b><span>Ürün seç, metraj gir, lojistik ve teklif toplamını gör.</span></div><div className="mta-top-actions"><select value={lang} onChange={(e) => setLang(e.target.value as any)}>{langs.map((l) => <option key={l} value={l}>{LANG_META[l].flag} {LANG_META[l].name}</option>)}</select><button onClick={handleSaveProject} className="mta-btn primary">Kaydet</button><button onClick={() => downloadProposal(lang, result)} className="mta-btn primary">PDF</button></div></header>
      <section className="mta-hero-pro mta-product-analysis-hero"><div><span>Ürün Analiz Bölümü • {offerNo}</span><h1>{selectedProduct.name}</h1><p>{selectedProduct.description}</p><div className="mta-color-row">{selectedProduct.colors.map(c=><span key={c} className="mta-color-pill">{c}</span>)}</div></div><div className="mta-hero-total"><small>{selectedProduct.stockLabel}</small><b>{money(result.total, locale)}</b></div></section>
      <section className="mta-kpis"><Kpi label="Birim Fiyat" value={money(unitPrice, locale)} note={`${selectedProduct.unit} bazında`} /><Kpi label="Palet" value={`${pallets}`} note="otomatik" /><Kpi label="Tonaj" value={`${tonnage} ton`} note="ürüne göre" /><Kpi label="Yakıt" value={money(fuelCost, locale)} note={`${distance} km`} /></section>
      <div className="mta-clean-grid"><div><MtaProductSelector value={selectedProductId} onChange={setSelectedProductId} /><MtaMultiProductPanel /></div><aside className="mta-card mta-clean-side"><CardTitle title="Hızlı Analiz" sub="Metraj, lojistik ve teklif özeti" live /><div className="mta-form-grid"><Field label={T('area')} value={area} setValue={setArea}/><Field label={T('unit')} value={unitPrice} setValue={setUnitPrice}/><Field label={T('labor')} value={laborPrice} setValue={setLabor}/><Field label={T('shipping')} value={shipping} setValue={setShipping}/></div><div className="mta-advice"><b>Araç Önerisi</b><p>{vehicleAdvice(pallets)}</p></div><div className="mta-price-mini"><span>Maliyet Check-up</span><strong>%{checkup}</strong><p>Sektör ortalamasına göre hızlı kıyas.</p></div><button onClick={handleSaveProject} className="mta-btn primary wide">Projeyi Kaydet</button><a className="mta-btn ghost wide" href={`https://wa.me/905000000000?text=${whatsAppText}`} target="_blank">Uzmandan Doğrulama İste</a></aside></div>
      <section className="mta-bottom-grid"><div className="mta-card"><CardTitle title="Şantiye Notu" sub="Teklif açıklaması" /><TextField label="Not" value={siteNote} setValue={setSiteNote}/></div><div className="mta-card"><CardTitle title="Projelerim" sub="Son kayıtlar" />{savedProjects.slice(0,3).map(p=><div className="mta-project-row" key={p.id}><b>{p.project}</b><span>{p.offerNo}</span></div>)}{!savedProjects.length&&<InfoNote text="Henüz kayıt yok. Kaydet butonu ile ilk projeyi oluştur." />}</div></section>
    </section></main>);
}
function MenuGroup({title,items,active}:{title:string;items:readonly (readonly [string,string,string])[];active?:string}){return <div className="mta-menu-group"><small>{title}</small><nav className="mta-nav">{items.map(([icon,label,badge])=><span key={label} className={label===active?'active':''} data-tip={label}><i>{icon}</i><b>{label}</b>{badge&&<em>{badge}</em>}</span>)}</nav></div>}
function Field({ label, value, setValue }: { label: string; value: number; setValue: (v: number) => void }) {return <label className="mta-field"><span>{label}</span><input type="number" value={value} onChange={(e)=>setValue(Number(e.target.value))}/></label>;}
function TextField({ label, value, setValue }: { label: string; value: string; setValue: (v: string) => void }) {return <label className="mta-field"><span>{label}</span><input value={value} onChange={(e)=>setValue(e.target.value)}/></label>;}
function Kpi({label,value,note}:{label:string;value:string;note:string}){return <article className="mta-kpi"><span>{label}</span><b>{value}</b><small>{note}</small></article>}
function CardTitle({title,sub,live}:{title:string;sub:string;live?:boolean}){return <div className="mta-card-title"><div><h2>{title}</h2><p>{sub}</p></div>{live && <em>Canlı</em>}</div>}
function InfoNote({text}:{text:string}){return <div className="mta-info-note">{text}</div>}
