'use client';

import { MTA_PRODUCTS, getProductById } from '@/lib/products/mtaProducts';

export default function MtaProductSelector({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const selected = getProductById(value);

  return (
    <div className="mta-card">
      <div className="mta-card-title">
        <div>
          <h2>Ürün Seçimi</h2>
          <p>Kilit taşı, karo ve bordür ürünlerini seçerek hesaplamayı özelleştirin.</p>
        </div>
        <em>ÜRÜN</em>
      </div>

      <div className="mta-product-grid">
        {MTA_PRODUCTS.map((p) => (
          <div
            key={p.id}
            className={`mta-product-card ${p.id === value ? 'active' : ''}`}
            onClick={() => onChange(p.id)}
          >
            <b>{p.name}</b>
            <span>{p.category}</span>
            <strong>{p.unitPrice} ₺ / {p.unit}</strong>
            <small>{p.stockLabel}</small>
          </div>
        ))}
      </div>

      <div className="mta-product-detail">
        <b>{selected.name}</b>
        <p>{selected.description}</p>
        <div className="mta-color-row">
          {selected.colors.map((c) => (
            <span key={c} className="mta-color-pill">{c}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
