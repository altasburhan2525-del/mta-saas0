export default function DashboardPage(){
  const cards = [
    ['Aktif Bayi','1'],
    ['Teklif','0'],
    ['Embed Kurulum','Hazır']
  ];
  return (
    <main style={{minHeight:'100vh',background:'#0f1724',color:'#fff',fontFamily:'Arial',padding:24}}>
      <section style={{maxWidth:1100,margin:'0 auto'}}>
        <h1>MT Altaş Hesaplayıcı Panel</h1>
        <p style={{color:'#aab7cc'}}>SaaS, bayi ve embed altyapısı yönetim merkezi.</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:16,marginTop:24}}>
          {cards.map(([label,value])=>(
            <div key={label} style={{background:'#1b2433',border:'1px solid rgba(255,255,255,.1)',borderRadius:18,padding:18}}>
              <div style={{color:'#aab7cc'}}>{label}</div>
              <strong style={{display:'block',fontSize:28,marginTop:8}}>{value}</strong>
            </div>
          ))}
        </div>
        <div style={{display:'flex',gap:12,flexWrap:'wrap',marginTop:24}}>
          <a href="/calculator" style={{padding:'12px 18px',background:'#d83939',borderRadius:12,color:'#fff',textDecoration:'none',fontWeight:800}}>Hesaplayıcı</a>
          <a href="/embed" style={{padding:'12px 18px',background:'#243041',borderRadius:12,color:'#fff',textDecoration:'none',fontWeight:800}}>Embed Kodu</a>
          <a href="/dealer" style={{padding:'12px 18px',background:'#243041',borderRadius:12,color:'#fff',textDecoration:'none',fontWeight:800}}>Bayi Paneli</a>
        </div>
      </section>
    </main>
  );
}
