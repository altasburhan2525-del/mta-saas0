'use client';

import { MTA_PRODUCTS, getProductById } from '@/lib/products/mtaProducts';

export default function MtaProductSelector({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const selected = getProductById(value);
  const featured = MTA_PRODUCTS.slice(0, 6);

  return (
    <section className="mta-card mta-product-section">
      <div className="mta-card-title">
        <div>
          <h2>Ürün Analiz Kataloğu</h2>
          <p>Önce ana ürünü seçin; fiyat, stok, palet ve tonaj analizi otomatik güncellensin.</p>
        </div>
        <em>ÜRÜN</em>
      </div>

      <div className="mta-product-grid">
        {featured.map((p) => (
          <button
            type="button"
            key={p.id}
            className={`mta-product-card ${p.id === value ? 'active' : ''}`}
            onClick={() => onChange(p.id)}
          >
            <span className="mta-product-category">{p.category}</span>
            <b>{p.name}</b>
            <p>{p.description}</p>
            <strong>{p.unitPrice.toLocaleString('tr-TR')} ₺ / {p.unit}</strong>
            <small>{p.stockLabel}</small>
          </button>
        ))}
      </div>

      <div className="mta-product-detail">
        <div>
          <span className="mta-product-category">Seçili Ürün</span>
          <b>{selected.name}</b>
          <p>{selected.description}</p>
        </div>
        <div className="mta-color-row">
          {selected.colors.map((c) => <span key={c} className="mta-color-pill">{c}</span>)}
        </div>
      </div>
    </section>
  );
}
