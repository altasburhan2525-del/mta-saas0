'use client';

import { useState } from 'react';
import { defaultProducts } from '@/data/adminStore';

export default function AdminPage(){
  const [products,setProducts]=useState(defaultProducts);
  const [pass,setPass]=useState('');
  const [auth,setAuth]=useState(false);

  const login=()=>{
    if(pass==='1234'){setAuth(true);}else{alert('Şifre yanlış');}
  };

  const updatePrice=(id:string,value:number)=>{
    setProducts(p=>p.map(x=>x.id===id?{...x,price:value}:x));
  };

  if(!auth){
    return (
      <div style={{padding:40}}>
        <h1>Admin Giriş</h1>
        <input type="password" placeholder="şifre" value={pass} onChange={e=>setPass(e.target.value)} />
        <button onClick={login}>Giriş</button>
      </div>
    );
  }

  return (
    <div style={{padding:40}}>
      <h1>Admin Panel</h1>
      {products.map(p=>(
        <div key={p.id} style={{marginBottom:20}}>
          <b>{p.name}</b><br/>
          <input type="number" value={p.price} onChange={e=>updatePrice(p.id,Number(e.target.value))} />
        </div>
      ))}
    </div>
  );
}
