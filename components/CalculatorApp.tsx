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

const WHATSAPP_NUMBER = '905426174956';

export default function CalculatorApp(){
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [quantity, setQuantity] = useState(100);
  const [unitPrice, setUnitPrice] = useState(750);
  const [laborPrice, setLaborPrice] = useState(0);
  const [transportPrice, setTransportPrice] = useState(0);
  const [customerName, setCustomerName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [proposalResult, setProposalResult] = useState<any>(null);

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

  const createProposal = async () => {
    const res = await fetch('/api/proposals',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        areaM2: quantity,
        unitPrice,
        laborPrice,
        transportPrice,
        vatRate: 0.20,
        customerName,
        projectName,
        productName: selectedProduct?.name,
        productUnit: selectedProduct?.unit,
        quantity
      })
    });
    const data = await res.json();
    setProposalResult(data.proposal);
  };

  const printUrl = proposalResult ? `/proposal/print?id=${encodeURIComponent(proposalResult.id)}&customer=${encodeURIComponent(proposalResult.customerName)}&project=${encodeURIComponent(proposalResult.projectName)}&product=${encodeURIComponent(proposalResult.productName)}&unit=${encodeURIComponent(proposalResult.productUnit)}&quantity=${encodeURIComponent(proposalResult.quantity)}&subtotal=${encodeURIComponent(proposalResult.subtotal)}&vat=${encodeURIComponent(proposalResult.vat)}&total=${encodeURIComponent(proposalResult.total)}` : '';
  const whatsappText = proposalResult ? `MT Altaş Hesaplayıcı teklifiniz:%0A%0ATeklif No: ${proposalResult.id}%0AMüşteri: ${proposalResult.customerName}%0AProje: ${proposalResult.projectName}%0AÜrün: ${proposalResult.productName}%0AToplam: ${proposalResult.total} ₺%0A%0ATeklif: ${typeof window !== 'undefined' ? window.location.origin + printUrl : printUrl}` : '';
  const whatsappUrl = proposalResult ? `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}` : '';

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
        <label>Müşteri adı
          <input value={customerName} onChange={e=>setCustomerName(e.target.value)} style={inputStyle} />
        </label>
        <label>Proje adı
          <input value={projectName} onChange={e=>setProjectName(e.target.value)} style={inputStyle} />
        </label>
      </div>
      <div style={{background:'#243041',padding:16,borderRadius:12}}>
        <div>Seçilen: {selectedProduct?.name || 'Ürün seçilmedi'}</div>
        <div>Ara Toplam: {formatTry(result.subtotal)}</div>
        <div>KDV: {formatTry(result.vat)}</div>
        <strong>Genel Toplam: {formatTry(result.total)}</strong>
      </div>
      <button onClick={createProposal} style={{height:48,borderRadius:14,border:0,background:'#d83939',color:'#fff',fontWeight:900}}>Teklif Oluştur</button>
      {proposalResult && (
        <div style={{background:'#1b2433',padding:16,borderRadius:12}}>
          <strong>Teklif oluşturuldu</strong>
          <div>No: {proposalResult.id}</div>
          <div>Müşteri: {proposalResult.customerName}</div>
          <div>Toplam: {proposalResult.total} ₺</div>
          <div style={{display:'flex',gap:10,flexWrap:'wrap',marginTop:12}}>
            <a href={printUrl} target="_blank" style={{display:'inline-flex',padding:'12px 16px',borderRadius:12,background:'#fff',color:'#111827',fontWeight:900,textDecoration:'none'}}>PDF / Teklif Görüntüle</a>
            <a href={whatsappUrl} target="_blank" style={{display:'inline-flex',padding:'12px 16px',borderRadius:12,background:'#25D366',color:'#0f1724',fontWeight:900,textDecoration:'none'}}>WhatsApp Gönder</a>
          </div>
        </div>
      )}
    </div>
  );
}

const inputStyle = { width:'100%', height:44, borderRadius:12, border:0, padding:'0 12px', marginTop:6 };
