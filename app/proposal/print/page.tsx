export default function ProposalPrintPage(){
  return (
    <main style={{minHeight:'100vh',background:'#f3f4f6',padding:24,fontFamily:'Arial',color:'#111827'}}>
      <section style={{maxWidth:820,margin:'0 auto',background:'#fff',padding:32,borderRadius:18,boxShadow:'0 10px 30px rgba(0,0,0,.08)'}}>
        <header style={{display:'flex',justifyContent:'space-between',gap:16,borderBottom:'2px solid #111827',paddingBottom:18}}>
          <div>
            <h1 style={{margin:0}}>MT Altaş Hesaplayıcı</h1>
            <p style={{margin:'8px 0 0',color:'#6b7280'}}>Kurumsal Teklif Belgesi</p>
          </div>
          <div style={{textAlign:'right'}}>
            <strong>Teklif No</strong>
            <div>MT-DEMO</div>
          </div>
        </header>

        <section style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:18,marginTop:24}}>
          <div>
            <h3>Müşteri Bilgileri</h3>
            <p>Demo Müşteri</p>
            <p>Demo Proje</p>
          </div>
          <div style={{textAlign:'right'}}>
            <h3>Tarih</h3>
            <p>{new Date().toLocaleDateString('tr-TR')}</p>
          </div>
        </section>

        <table style={{width:'100%',borderCollapse:'collapse',marginTop:24}}>
          <thead>
            <tr style={{background:'#111827',color:'#fff'}}>
              <th style={th}>Ürün/Hizmet</th>
              <th style={th}>Miktar</th>
              <th style={th}>Birim</th>
              <th style={th}>Tutar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={td}>Demo Ürün</td>
              <td style={td}>100</td>
              <td style={td}>m²</td>
              <td style={td}>₺75.000</td>
            </tr>
          </tbody>
        </table>

        <section style={{marginTop:24,marginLeft:'auto',maxWidth:320}}>
          <div style={totalRow}><span>Ara Toplam</span><strong>₺75.000</strong></div>
          <div style={totalRow}><span>KDV</span><strong>₺15.000</strong></div>
          <div style={{...totalRow,fontSize:20,borderTop:'2px solid #111827',paddingTop:12}}><span>Genel Toplam</span><strong>₺90.000</strong></div>
        </section>

        <footer style={{marginTop:32,borderTop:'1px solid #e5e7eb',paddingTop:16,color:'#6b7280',fontSize:12}}>
          Bu belge MT Altaş Hesaplayıcı sistemi tarafından oluşturulmuştur.
        </footer>

        <button type="button" style={{marginTop:20,padding:'12px 18px',borderRadius:12,border:0,background:'#d83939',color:'#fff',fontWeight:900}}>PDF / Yazdır için Ctrl+P</button>
      </section>
    </main>
  );
}

const th = {padding:12,textAlign:'left' as const};
const td = {padding:12,borderBottom:'1px solid #e5e7eb'};
const totalRow = {display:'flex',justifyContent:'space-between',padding:'8px 0'};
