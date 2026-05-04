'use client';
import { useEffect, useState } from 'react';

type Product = {
  id: string;
  name: string;
  category: string;
  unit: string;
  price: number;
};

export default function AdminProductsPage(){
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(()=>{
    fetch('/api/products')
      .then(r=>r.json())
      .then(data=>setProducts(data.products || []));
  },[]);

  return (
    <main style={{minHeight:'100vh',background:'#0f1724',color:'#fff',padding:24,fontFamily:'Arial'}}>
      <section style={{maxWidth:1000,margin:'0 auto'}}>
        <h1>Ürün Yönetimi</h1>
        <table style={{width:'100%',marginTop:20,borderCollapse:'collapse'}}>
          <thead>
            <tr>
              <th>Ürün</th>
              <th>Kategori</th>
              <th>Birim</th>
              <th>Fiyat</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p=>(
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>{p.unit}</td>
                <td>{p.price} ₺</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
