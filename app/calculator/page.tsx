import CalculatorApp from '@/components/CalculatorApp';

export default function CalculatorPage(){
  return (
    <main style={{minHeight:'100vh',background:'#0f1724',color:'#fff',fontFamily:'Arial',padding:24}}>
      <section style={{maxWidth:980,margin:'0 auto'}}>
        <h1>MT Altaş Hesaplayıcı</h1>
        <p style={{color:'#aab7cc'}}>Profesyonel teklif hesaplama sistemi</p>
        <div style={{marginTop:24,background:'#1b2433',padding:20,borderRadius:20}}>
          <CalculatorApp />
        </div>
      </section>
    </main>
  );
}
