export default function Home() {
  return (
    <main style={{minHeight:'100vh',display:'grid',placeItems:'center',background:'#0f1724',color:'#fff',fontFamily:'Arial',padding:24}}>
      <div style={{textAlign:'center'}}>
        <h1 style={{fontSize:32,marginBottom:10}}>MT Altaş Hesaplayıcı</h1>
        <p style={{color:'#aab7cc'}}>SaaS ve Embed altyapısı hazırlanıyor</p>
        <div style={{marginTop:20}}>
          <a href="/embed" style={{padding:'12px 18px',background:'#d83939',borderRadius:12,color:'#fff',textDecoration:'none',fontWeight:800}}>Embed Yayınla</a>
        </div>
      </div>
    </main>
  );
}
