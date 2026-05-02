'use client';

import { useMemo, useState } from 'react';
import { useMtaLang } from '@/lib/i18n/useMtaLang';
import { LANG_META } from '@/lib/i18n/dictionaries';
import { getProductById, MTA_PRODUCTS } from '@/lib/products/mtaProducts';

export default function MtaSaasApp() {
  const { lang, setLang, langs, meta } = useMtaLang();
  const [productId, setProductId] = useState('kilit-tasi-6cm');
  const [quantity, setQuantity] = useState(100);
  const product = getProductById(productId);
  const subtotal = useMemo(() => quantity * product.unitPrice, [quantity, product.unitPrice]);
  const vat = subtotal * 0.2;
  const total = subtotal + vat;
  const money = (v: number) => new Intl.NumberFormat(meta.locale || 'tr-TR', { style: 'currency', currency: 'TRY' }).format(v || 0);

  return (
    <main className="mta-reset-shell" dir={meta.dir}>
      <aside className="mta-reset-sidebar">
        <div className="mta-reset-logo">MT</div>
        <div className="mta-reset-brand">
          <b>MT Altaş</b>
          <span>İnşaat Hesap Platformu</span>
        </div>
        <nav>
          <a className="active">Ürün Analizi</a>
          <a>Teklif Hazırla</a>
          <a>Projeler</a>
          <a>Fiyat Listesi</a>
        </nav>
      </aside>

      <section className="mta-reset-main">
        <header className="mta-reset-topbar">
          <div>
            <span>Yeni Temiz Tasarım</span>
            <h1>İnşaat ürün analiz ve teklif paneli</h1>
          </div>
          <select value={lang} onChange={(e) => setLang(e.target.value as any)}>
            {langs.map((l) => <option key={l} value={l}>{LANG_META[l].flag} {LANG_META[l].name}</option>)}
          </select>
        </header>

        <section className="mta-reset-hero">
          <div>
            <span>Ürün Analiz Bölümü</span>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
          </div>
          <div className="mta-reset-total">
            <small>Genel Toplam</small>
            <b>{money(total)}</b>
          </div>
        </section>

        <section className="mta-reset-grid">
          <div className="mta-reset-card big">
            <div className="mta-reset-card-title">
              <h3>Ürün Seçimi</h3>
              <p>Temiz başlangıç için sadece ana ürün analizi gösteriliyor.</p>
            </div>
            <div className="mta-reset-products">
              {MTA_PRODUCTS.slice(0, 6).map((p) => (
                <button key={p.id} className={p.id === productId ? 'active' : ''} onClick={() => setProductId(p.id)}>
                  <span>{p.category}</span>
                  <b>{p.name}</b>
                  <strong>{money(p.unitPrice)} / {p.unit}</strong>
                </button>
              ))}
            </div>
          </div>

          <aside className="mta-reset-card">
            <div className="mta-reset-card-title">
              <h3>Hızlı Hesap</h3>
              <p>Miktar gir, toplamı gör.</p>
            </div>
            <label className="mta-reset-field">
              <span>Miktar ({product.unit})</span>
              <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
            </label>
            <div className="mta-reset-summary">
              <div><span>Ara Toplam</span><b>{money(subtotal)}</b></div>
              <div><span>KDV %20</span><b>{money(vat)}</b></div>
              <div className="total"><span>Genel Toplam</span><b>{money(total)}</b></div>
            </div>
            <button className="mta-reset-primary">Teklif Oluştur</button>
          </aside>
        </section>
      </section>
    </main>
  );
}
