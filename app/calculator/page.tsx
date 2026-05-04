export default function CalculatorPage(){
  return (
    <main style={{minHeight:'100vh',background:'#0f1724',color:'#fff',fontFamily:'Arial',padding:24}}>
      <section style={{maxWidth:980,margin:'0 auto'}}>
        <h1>MT Altaş Hesaplayıcı</h1>
        <p style={{color:'#aab7cc'}}>Web sitelerine gömülebilir hesaplayıcı altyapısı.</p>
        <div id="mt-altas-hesaplayici" style={{marginTop:24,border:'1px solid rgba(255,255,255,.1)',borderRadius:20,padding:20,background:'#1b2433'}}>
          <h2>Hızlı Teklif Hesabı</h2>
          <p style={{color:'#aab7cc'}}>Bu alan mevcut gelişmiş hesaplayıcı motorunun güvenli embed kapsayıcısıdır.</p>
          <form style={{display:'grid',gap:12,maxWidth:520}}>
            <label>Alan m²<input name="area" type="number" defaultValue="100" style={{width:'100%',height:44,borderRadius:12,border:0,padding:'0 12px',marginTop:6}} /></label>
            <label>Birim fiyat<input name="price" type="number" defaultValue="750" style={{width:'100%',height:44,borderRadius:12,border:0,padding:'0 12px',marginTop:6}} /></label>
            <button type="button" style={{height:46,border:0,borderRadius:14,background:'#d83939',color:'#fff',fontWeight:900}}>Hesapla</button>
          </form>
        </div>
      </section>
    </main>
  );
}
