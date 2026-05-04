export default function LegacyAdminPage() {
  return (
    <main style={{minHeight:'100vh',display:'grid',placeItems:'center',background:'#0f1724',color:'#fff',fontFamily:'Arial,sans-serif',padding:24}}>
      <section style={{maxWidth:560,border:'1px solid rgba(255,255,255,.12)',borderRadius:24,padding:28,background:'#1b2433'}}>
        <h1 style={{marginTop:0}}>MT Altaş Admin</h1>
        <p style={{color:'#aab7cc',lineHeight:1.7}}>Yeni SaaS admin paneli kök app yapısına taşındı. Vercel build çakışmasını önlemek için eski src/admin sayfası sadeleştirildi.</p>
        <a href="/admin" style={{display:'inline-flex',padding:'13px 18px',borderRadius:14,background:'#d83939',color:'#fff',fontWeight:900,textDecoration:'none'}}>Admin Paneline Git</a>
      </section>
    </main>
  );
}
