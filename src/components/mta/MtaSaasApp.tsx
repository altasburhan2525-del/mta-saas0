'use client';

import { useMemo, useState } from 'react';
import { useMtaLang } from '@/lib/i18n/useMtaLang';
import { LANG_META } from '@/lib/i18n/dictionaries';
import { getProductById, MTA_PRODUCTS } from '@/lib/products/mtaProducts';
import { MTA_V21_SOURCE_SIGNATURE } from '@/lib/mta-v21/migrationNotes';

export default function MtaSaasApp() {
  const { lang, setLang, langs, meta } = useMtaLang();
  const [productId, setProductId] = useState('kilit-tasi-6cm');
  const [quantity, setQuantity] = useState(100);
  const [labor, setLabor] = useState(5000);
  const [shipping, setShipping] = useState(3500);
  const product = getProductById(productId);
  const productTotal = useMemo(() => quantity * product.unitPrice, [quantity, product.unitPrice]);
  const subtotal = productTotal + labor + shipping;
  const vat = subtotal * 0.2;
  const total = subtotal + vat;
  const money = (v: number) => new Intl.NumberFormat(meta.locale || 'tr-TR', { style: 'currency', currency: 'TRY' }).format(v || 0);

  return (
    <main id="mta11-smart-calc-root" data-mta-sign={MTA_V21_SOURCE_SIGNATURE} className="mta-v21-layout" dir={meta.dir}>
      <aside className="mta-v21-side">
        <div className="mta-v21-brand"><div>MT</div><section><b>MT Altaş</b><span>v21.2 Koyu SaaS</span></section></div>
        <nav><a className="active">Dashboard</a><a>Yeni Hesap</a><a>Teklifler</a><a>Fiyat Listesi</a><a>Destek</a></nav>
        <p>Usta, bayi ve büyük firma için kaybolmayan teklif akışı.</p>
      </aside>

      <section className="mta-v21-center">
        <header className="mta-v21-top"><div><span>Ürün Analiz Bölümü</span><h1>İnşaat ürün analiz ve teklif paneli</h1></div><select value={lang} onChange={(e) => setLang(e.target.value as any)}>{langs.map((l) => <option key={l} value={l}>{LANG_META[l].flag} {LANG_META[l].name}</option>)}</select></header>
        <section className="mta-v21-hero"><div><span>Aktif Ürün</span><h2>{product.name}</h2><p>{product.description}</p></div><strong>{money(total)}</strong></section>
        <section className="mta-v21-steps"><div className="active">1 Proje</div><div className="active">2 Ürün</div><div>3 Ölçü</div><div>4 Lojistik</div><div>5 Teklif</div></section>
        <section className="mta-v21-card"><h3>Ürün Seçimi</h3><p>Önce ana ürünü seç. Sonra miktar, işçilik ve nakliye değerlerini gir.</p><div className="mta-v21-products">{MTA_PRODUCTS.slice(0, 6).map((p) => <button key={p.id} className={p.id === productId ? 'active' : ''} onClick={() => setProductId(p.id)}><small>{p.category}</small><b>{p.name}</b><span>{money(p.unitPrice)} / {p.unit}</span></button>)}</div></section>
        <section className="mta-v21-card"><h3>Ölçü ve Lojistik</h3><div className="mta-v21-fields"><label><span>Miktar ({product.unit})</span><input type="number" value={quantity} onChange={(e)=>setQuantity(Number(e.target.value))}/></label><label><span>İşçilik</span><input type="number" value={labor} onChange={(e)=>setLabor(Number(e.target.value))}/></label><label><span>Nakliye</span><input type="number" value={shipping} onChange={(e)=>setShipping(Number(e.target.value))}/></label></div></section>
      </section>

      <aside className="mta-v21-summary"><h3>Teklif Özeti</h3><p>Toplam her zaman görünür. Kullanıcı kaybolmaz.</p><div><span>Ürünler</span><b>{money(productTotal)}</b></div><div><span>İşçilik</span><b>{money(labor)}</b></div><div><span>Nakliye</span><b>{money(shipping)}</b></div><div><span>KDV %20</span><b>{money(vat)}</b></div><section><span>Genel Toplam</span><strong>{money(total)}</strong></section><button>PDF Hazırla</button><button className="dark">WhatsApp Teklifi</button></aside>
    </main>
  );
}
