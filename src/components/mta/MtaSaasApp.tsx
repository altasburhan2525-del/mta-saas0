'use client';

import { useMemo, useState } from 'react';
import { calculateOffer, money } from '@/lib/calc/mtaCalcCore';
import { useMtaLang } from '@/lib/i18n/useMtaLang';
import { LANG_META } from '@/lib/i18n/dictionaries';
import { downloadProposal } from '@/lib/pdf/proposalPdf';

export default function MtaSaasApp() {
  const { lang, setLang, T, langs, meta } = useMtaLang();
  const [area, setArea] = useState(100);
  const [unitPrice, setUnitPrice] = useState(350);
  const [laborPrice, setLabor] = useState(5000);
  const [shipping, setShipping] = useState(3500);
  const [vatRate, setVatRate] = useState(0.2);
  const result = useMemo(() => calculateOffer({ area, unitPrice, laborPrice, shipping, vatRate }), [area, unitPrice, laborPrice, shipping, vatRate]);
  const locale = meta.locale;
  const chartA = Math.max(8, Math.min(82, Math.round((area / 250) * 100)));
  const chartB = Math.max(8, Math.min(82, Math.round((unitPrice / 800) * 100)));
  const chartC = Math.max(8, Math.min(82, Math.round((laborPrice / 12000) * 100)));

  return (
    <main dir={meta.dir} style={styles.page}>
      <aside style={styles.sidebar}>
        <div style={styles.logoBlock}><b>MT Altaş</b><span>İnşaat Hesaplayıcı</span></div>
        <nav style={styles.nav}>
          {['Ana Panel', 'Proje Yönetimi', 'Metraj ve Maliyet', 'Malzeme Takibi', 'Nakliye ve Lojistik', 'Teklif Oluştur', 'Ayarlar'].map((n, i) => <span key={n} style={i === 0 ? styles.navActive : styles.navItem}>{n}</span>)}
        </nav>
      </aside>
      <section style={styles.workspace}>
        <header style={styles.topbar}>
          <button style={styles.menuBtn}>☰</button>
          <div style={styles.search}>Ara...</div>
          <select style={styles.select} value={lang} onChange={(e) => setLang(e.target.value as any)}>{langs.map((l) => <option key={l} value={l}>{LANG_META[l].flag} {LANG_META[l].name}</option>)}</select>
          <div style={styles.user}><span style={styles.avatar}>MT</span><div><b>MT Altaş</b><small style={styles.userRole}>Yönetici</small></div></div>
        </header>
        <div style={styles.hero}>
          <div><span style={styles.badge}>MT Altaş Pro Dashboard</span><h1 style={styles.title}>{T('title')}</h1><p style={styles.subtitle}>{T('sub')}</p></div>
          <button onClick={() => downloadProposal(lang, result)} style={styles.goldBtn}>PDF Olarak İndir</button>
        </div>
        <div style={styles.mainGrid}>
          <section style={styles.formCard}>
            <div style={styles.cardHead}><div><h2 style={styles.cardTitle}>Proje Metrajı ve Maliyet Hesaplama</h2><p style={styles.cardSub}>Premium panel yapısına göre yeniden tasarlandı.</p></div><span style={styles.live}>Canlı</span></div>
            <div style={styles.groupTitle}>1. Kaba / Ana Hesap</div>
            <div style={styles.formGrid}><Field label={T('area')} value={area} setValue={setArea}/><Field label={T('unit')} value={unitPrice} setValue={setUnitPrice}/><Field label={T('labor')} value={laborPrice} setValue={setLabor}/></div>
            <div style={styles.groupTitle}>2. Nakliye ve Vergi</div>
            <div style={styles.formGrid}><Field label={T('shipping')} value={shipping} setValue={setShipping}/><Field label={T('vat')} value={vatRate*100} setValue={(v)=>setVatRate(v/100)}/></div>
          </section>
          <aside style={styles.summaryCard}>
            <h2 style={styles.cardTitle}>Proje Özeti ve Toplam Maliyet</h2>
            <div style={styles.chartBox}><div style={{...styles.bar,height:`${chartA}%`}}/><div style={{...styles.bar,height:`${chartB}%`}}/><div style={{...styles.bar,height:`${chartC}%`}}/><div style={styles.donut}><span>{Math.round((result.vat/result.total)*100)}%</span></div></div>
            <Legend label="Metraj"/><Legend label="Birim fiyat"/><Legend label="İşçilik"/>
          </aside>
          <section style={styles.mapCard}>
            <h2 style={styles.cardTitle}>Nakliye ve Lojistik Maliyeti</h2>
            <div style={styles.fakeMap}><span>Başlangıç</span><i/><b>Varış</b></div>
            <div style={styles.formGrid}><Field label="Palet Sayısı" value={40} setValue={()=>{}}/><Field label="Tonaj" value={100} setValue={()=>{}}/></div>
          </section>
          <aside style={styles.totalCard}>
            <span style={styles.totalLabel}>Toplam Tahmini Maliyet</span>
            <b style={styles.totalValue}>{money(result.total,locale)}</b>
            <button onClick={() => downloadProposal(lang, result)} style={styles.goldBtnFull}>PDF Olarak İndir</button>
            <button style={styles.outlineBtn}>Müşteri Teklifi Oluştur</button>
          </aside>
        </div>
      </section>
    </main>
  );
}

function Field({ label, value, setValue }: { label: string; value: number; setValue: (v: number) => void }) {return <label style={styles.field}><span style={styles.label}>{label}</span><input type="number" value={value} onChange={(e)=>setValue(Number(e.target.value))} style={styles.input}/></label>;}
function Legend({label}:{label:string}){return <div style={styles.legend}><span style={styles.legendDot}/> {label}</div>}

const styles: Record<string, React.CSSProperties> = {
  page:{minHeight:'100vh',display:'grid',gridTemplateColumns:'250px 1fr',background:'#eef1f5',color:'#1f2937',fontFamily:'Inter,Arial,sans-serif'},
  sidebar:{background:'linear-gradient(180deg,#1f252b,#111827)',color:'#d1d5db',padding:22,boxShadow:'12px 0 40px rgba(0,0,0,.16)'},
  logoBlock:{height:82,borderBottom:'1px solid rgba(255,255,255,.08)',display:'grid',alignContent:'center',color:'#d6bd73',fontSize:22},
  nav:{display:'grid',gap:10,marginTop:22},
  navItem:{padding:'13px 14px',borderRadius:12,fontWeight:800,fontSize:14},
  navActive:{padding:'13px 14px',borderRadius:12,fontWeight:900,fontSize:14,background:'rgba(214,189,115,.18)',color:'#fff',border:'1px solid rgba(214,189,115,.28)'},
  workspace:{padding:22},
  topbar:{height:62,display:'flex',alignItems:'center',gap:14,background:'#20262d',color:'#fff',borderRadius:18,padding:'0 16px',boxShadow:'0 16px 40px rgba(31,41,55,.18)'},
  menuBtn:{background:'transparent',border:0,color:'#fff',fontSize:22},
  search:{marginLeft:'auto',minWidth:220,background:'rgba(255,255,255,.09)',borderRadius:999,padding:'11px 18px',color:'#cbd5e1'},
  select:{height:42,borderRadius:12,border:0,padding:'0 10px',fontWeight:900},
  user:{display:'flex',alignItems:'center',gap:10},
  userRole:{display:'block',color:'#cbd5e1'},
  avatar:{width:38,height:38,borderRadius:999,background:'#d6bd73',color:'#111827',display:'grid',placeItems:'center',fontWeight:900},
  hero:{display:'flex',justifyContent:'space-between',gap:18,alignItems:'flex-end',margin:'22px 0',background:'#fff',borderRadius:20,padding:24,boxShadow:'0 18px 55px rgba(15,23,42,.08)'},
  badge:{color:'#8a6d2c',fontWeight:950},
  title:{margin:'8px 0 6px',fontSize:'clamp(30px,5vw,54px)',letterSpacing:'-.05em'},
  subtitle:{margin:0,color:'#64748b'},
  goldBtn:{border:0,borderRadius:14,background:'#c6a85a',color:'#111827',padding:'13px 18px',fontWeight:950},
  mainGrid:{display:'grid',gridTemplateColumns:'1.35fr .65fr',gap:18},
  formCard:{background:'#fff',borderRadius:20,padding:22,boxShadow:'0 18px 55px rgba(15,23,42,.08)'},
  summaryCard:{background:'#fff',borderRadius:20,padding:22,boxShadow:'0 18px 55px rgba(15,23,42,.08)'},
  mapCard:{background:'#fff',borderRadius:20,padding:22,boxShadow:'0 18px 55px rgba(15,23,42,.08)'},
  totalCard:{background:'linear-gradient(180deg,#20262d,#111827)',borderRadius:20,padding:24,color:'#fff',boxShadow:'0 18px 55px rgba(15,23,42,.18)'},
  cardHead:{display:'flex',justifyContent:'space-between',gap:14},
  cardTitle:{margin:'0 0 12px',fontSize:22},
  cardSub:{margin:0,color:'#64748b'},
  live:{background:'#ecfdf5',color:'#047857',borderRadius:999,padding:'8px 10px',fontWeight:900},
  groupTitle:{margin:'20px 0 10px',fontWeight:950},
  formGrid:{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(190px,1fr))',gap:14},
  field:{display:'grid',gap:6},
  label:{fontWeight:900,fontSize:13},
  input:{height:46,border:'1px solid #d1d5db',borderRadius:12,padding:'0 12px',fontWeight:900,fontSize:15},
  chartBox:{height:185,display:'flex',gap:14,alignItems:'end',borderBottom:'1px solid #e5e7eb',paddingBottom:12},
  bar:{width:32,background:'#20262d',borderRadius:'8px 8px 0 0'},
  donut:{marginLeft:'auto',width:96,height:96,borderRadius:999,background:'conic-gradient(#c6a85a 0 38%,#20262d 38% 65%,#e5e7eb 65% 100%)',display:'grid',placeItems:'center',fontWeight:950},
  legend:{display:'inline-flex',gap:8,alignItems:'center',margin:'12px 12px 0 0',fontWeight:800,color:'#475569'},
  legendDot:{display:'inline-block',width:10,height:10,borderRadius:3,background:'#c6a85a'},
  fakeMap:{height:155,borderRadius:16,background:'linear-gradient(135deg,#dbeafe,#fef3c7)',marginBottom:14,position:'relative',display:'flex',alignItems:'center',justifyContent:'space-around',fontWeight:900},
  totalLabel:{display:'block',color:'#cbd5e1',fontWeight:900,textAlign:'center'},
  totalValue:{display:'block',fontSize:38,color:'#d6bd73',textAlign:'center',margin:'18px 0 24px'},
  goldBtnFull:{width:'100%',border:0,borderRadius:14,background:'#d6bd73',padding:'15px',fontWeight:950},
  outlineBtn:{width:'100%',border:'1px solid rgba(214,189,115,.55)',borderRadius:14,background:'transparent',color:'#f8fafc',padding:'15px',fontWeight:950,marginTop:12}
};
