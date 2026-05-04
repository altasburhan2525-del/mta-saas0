'use client';
import { useMemo, useState } from 'react';
import { calculateOffer, formatTry } from '@/lib/calculator';

export default function CalculatorApp(){
  const [areaM2, setAreaM2] = useState(100);
  const [unitPrice, setUnitPrice] = useState(750);
  const [laborPrice, setLaborPrice] = useState(0);
  const [transportPrice, setTransportPrice] = useState(0);

  const result = useMemo(()=>calculateOffer({ areaM2, unitPrice, laborPrice, transportPrice, vatRate: 0.20 }),[areaM2, unitPrice, laborPrice, transportPrice]);

  return (
    <div style={{display:'grid',gap:14}}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
        <label>Alan m²<input type='number' value={areaM2} onChange={e=>setAreaM2(Number(e.target.value))} /></label>
        <label>Birim fiyat<input type='number' value={unitPrice} onChange={e=>setUnitPrice(Number(e.target.value))} /></label>
        <label>İşçilik<input type='number' value={laborPrice} onChange={e=>setLaborPrice(Number(e.target.value))} /></label>
        <label>Nakliye<input type='number' value={transportPrice} onChange={e=>setTransportPrice(Number(e.target.value))} /></label>
      </div>

      <div style={{background:'#243041',padding:16,borderRadius:12}}>
        <div>Ara Toplam: {formatTry(result.subtotal)}</div>
        <div>KDV: {formatTry(result.vat)}</div>
        <strong>Genel Toplam: {formatTry(result.total)}</strong>
      </div>
    </div>
  );
}
