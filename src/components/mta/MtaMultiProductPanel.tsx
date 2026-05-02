'use client';

import { useState } from 'react';
import { MTA_PRODUCTS, getProductCategories, calculateOfferLines } from '@/lib/products/mtaProducts';

export default function MtaMultiProductPanel() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [lines, setLines] = useState<any[]>([]);

  const categories = getProductCategories();

  function addProduct(productId: string) {
    setLines((prev) => [...prev, { id: Date.now().toString(), productId, quantity: 1 }]);
  }

  function updateQty(id: string, qty: number) {
    setLines((prev) => prev.map(l => l.id === id ? { ...l, quantity: qty } : l));
  }

  const calculated = calculateOfferLines(lines);
  const total = calculated.reduce((sum, l) => sum + l.lineTotal, 0);

  return (
    <div className="mta-card">
      <div className="mta-card-title">
        <div>
          <h2>Çoklu Ürün Analiz Paneli</h2>
          <p>İnşaatın A’dan Z’ye tüm kalemlerini ekleyerek toplam teklif oluşturun.</p>
        </div>
        <em>MULTI</em>
      </div>

      {categories.map(cat => (
        <div key={cat} className="mta-accordion">
          <div className="mta-accordion-head" onClick={() => setOpenCategory(openCategory === cat ? null : cat)}>
            <b>{cat}</b>
            <span>{openCategory === cat ? '-' : '+'}</span>
          </div>

          {openCategory === cat && (
            <div className="mta-accordion-body">
              {MTA_PRODUCTS.filter(p => p.category === cat).map(p => (
                <div key={p.id} className="mta-product-row">
                  <span>{p.name}</span>
                  <button onClick={() => addProduct(p.id)}>Ekle</button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <div className="mta-offer-lines">
        {calculated.map(line => (
          <div key={line.id} className="mta-offer-line">
            <b>{line.product.name}</b>
            <input type="number" value={line.quantity} onChange={(e)=>updateQty(line.id, Number(e.target.value))} />
            <span>{line.lineTotal.toLocaleString()} ₺</span>
          </div>
        ))}
      </div>

      <div className="mta-offer-total">
        <b>Toplam: {total.toLocaleString()} ₺</b>
      </div>
    </div>
  );
}
