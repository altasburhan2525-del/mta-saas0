'use client';
import { useEffect, useMemo, useState } from 'react';
import { calculateOffer, formatTry } from '@/lib/calculator';

type Product = {
  id: string;
  name: string;
  category: string;
  unit: string;
  price: number;
};

export default function CalculatorApp(){
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [quantity, setQuantity] = useState(100);
  const [unitPrice, setUnitPrice] = useState(750);
  const [laborPrice, setLaborPrice] = useState(0);
  const [transportPrice, setTransportPrice] = useState(0);

  useEffect(()=>{
    fetch('/api/products')
      .then(r=>r.json())
      .then(data=>{
        const list = data.products || [];
        setProducts(list);
        if(list[0]){
          setSelectedProductId(list[0].id);
          setUnitPrice(list[0].price);
        }
      })
      .catch(()=>{});
  },[]);

  const selectedProduct = products.find(product => product.id === selectedProductId);

  const result = useMemo(()=>calculateOffer({ areaM2: quantity, unitPrice, laborPrice, transportPrice, vatRate: 0.20 }),[quantity, unitPrice, laborPrice, transportPrice]);

  const onProductChange = (id: string) => {
    setSelectedProductId(id);
    const product = products.find(item => item.id === id);
    if(product) setUnitPrice(product.price);
  };

  return (
    <div style={{display:'grid',gap:14}}>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:12}}>
        <label>Ürün / Hizmet
          <select value={selectedProductId} onChange={e=>onProductChange(e.target.value)} style={inputStyle}>
            {products.map(product=><option key={product.id} value={product.id}>{product.name}</option>)}
          </select>
        </label>
        <label>Miktar {selectedProduct ? `(${selectedProduct.unit})` : ''}
          <input type='number' value={quantity} onChange={e=>setQuantity(Number(e.target.value))} style={inputStyle} />
        </label>
        <label>Birim fiyat
          <input type='number' value={unitPrice} onChange={e=>setUnitPrice(Number(e.target.value))} style={inputStyle} />
        </label>
        <label>İşçilik
          <input type='number' value={laborPrice} onChange={e=>setLaborPrice(Number(e.target.value))} style={inputStyle} />
        </label>
        <label>Nakliye
          <input type='number' value={transportPrice} onChange={e=>setTransportPrice(Number(e.target.value))} style={inputStyle} />
        </label>
      </div>

      <div style={{background:'#243041',padding:16,borderRadius:12}}>
        <div>Seçilen: {selectedProduct?.name || 'Ürün seçilmedi'}</div>
        <div>Ara Toplam: {formatTry(result.subtotal)}</div>
        <div>KDV: {formatTry(result.vat)}</div>
        <strong>Genel Toplam: {formatTry(result.total)}</strong>
      </div>
    </div>
  );
}

const inputStyle = {
  width:'100%',
  height:44,
  borderRadius:12,
  border:0,
  padding:'0 12px',
  marginTop:6
};
