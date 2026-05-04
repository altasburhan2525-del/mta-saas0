'use client';
import { useEffect, useState } from 'react';

type Proposal = {
  id: string;
  customerName: string;
  projectName: string;
  productName: string;
  quantity: number;
  total: number;
  status: string;
  createdAt: string;
};

export default function ProposalsPage(){
  const [proposals, setProposals] = useState<Proposal[]>([]);

  useEffect(()=>{
    fetch('/api/proposals')
      .then(r=>r.json())
      .then(data=>setProposals(data.proposals || []))
      .catch(()=>setProposals([]));
  },[]);

  return (
    <main style={{minHeight:'100vh',background:'#0f1724',color:'#fff',fontFamily:'Arial',padding:24}}>
      <section style={{maxWidth:1100,margin:'0 auto'}}>
        <h1>Teklif Listesi</h1>
        <p style={{color:'#aab7cc'}}>Oluşturulan teklifler burada listelenir.</p>
        <div style={{display:'flex',gap:12,margin:'20px 0'}}>
          <a href="/calculator" style={btn}>Yeni Teklif</a>
          <a href="/dashboard" style={btnDark}>Dashboard</a>
        </div>
        <div style={{overflowX:'auto',background:'#1b2433',borderRadius:18,padding:16}}>
          <table style={{width:'100%',borderCollapse:'collapse',minWidth:760}}>
            <thead>
              <tr>
                <th style={th}>No</th>
                <th style={th}>Müşteri</th>
                <th style={th}>Proje</th>
                <th style={th}>Ürün</th>
                <th style={th}>Miktar</th>
                <th style={th}>Toplam</th>
                <th style={th}>Durum</th>
              </tr>
            </thead>
            <tbody>
              {proposals.length === 0 && <tr><td colSpan={7} style={td}>Henüz teklif yok. /calculator üzerinden teklif oluştur.</td></tr>}
              {proposals.map(p=>(
                <tr key={p.id}>
                  <td style={td}>{p.id}</td>
                  <td style={td}>{p.customerName}</td>
                  <td style={td}>{p.projectName}</td>
                  <td style={td}>{p.productName}</td>
                  <td style={td}>{p.quantity}</td>
                  <td style={td}>{p.total} ₺</td>
                  <td style={td}>{p.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

const th = {textAlign:'left' as const,padding:12,borderBottom:'1px solid rgba(255,255,255,.12)',color:'#aab7cc'};
const td = {padding:12,borderBottom:'1px solid rgba(255,255,255,.08)'};
const btn = {display:'inline-flex',padding:'12px 16px',borderRadius:12,background:'#d83939',color:'#fff',textDecoration:'none',fontWeight:900};
const btnDark = {display:'inline-flex',padding:'12px 16px',borderRadius:12,background:'#243041',color:'#fff',textDecoration:'none',fontWeight:900};
