type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function val(params: Record<string, string | string[] | undefined>, key: string, fallback = '') {
  const value = params[key];
  return Array.isArray(value) ? value[0] || fallback : value || fallback;
}

export default async function ProposalDetailPage({ params, searchParams }: PageProps){
  const { id } = await params;
  const sp = await searchParams;
  const customer = val(sp, 'customer', 'Müşteri');
  const project = val(sp, 'project', 'Proje');
  const product = val(sp, 'product', 'Ürün / Hizmet');
  const unit = val(sp, 'unit', 'adet');
  const quantity = val(sp, 'quantity', '0');
  const subtotal = val(sp, 'subtotal', '0');
  const vat = val(sp, 'vat', '0');
  const total = val(sp, 'total', '0');
  const qs = new URLSearchParams({ id, customer, project, product, unit, quantity, subtotal, vat, total }).toString();

  return (
    <main style={{minHeight:'100vh',background:'#0f1724',color:'#fff',fontFamily:'Arial',padding:24}}>
      <section style={{maxWidth:920,margin:'0 auto'}}>
        <a href="/proposals" style={{color:'#aab7cc',textDecoration:'none'}}>← Teklif listesi</a>
        <div style={{marginTop:18,background:'#1b2433',border:'1px solid rgba(255,255,255,.1)',borderRadius:22,padding:24}}>
          <div style={{display:'flex',justifyContent:'space-between',gap:16,flexWrap:'wrap'}}>
            <div>
              <h1 style={{margin:'0 0 8px'}}>Teklif Detayı</h1>
              <p style={{margin:0,color:'#aab7cc'}}>Teklif No: {id}</p>
            </div>
            <span style={{padding:'8px 12px',borderRadius:999,background:'rgba(37,211,102,.12)',color:'#d8ffe5',fontWeight:900}}>draft</span>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:14,marginTop:22}}>
            <Info title="Müşteri" value={customer} />
            <Info title="Proje" value={project} />
            <Info title="Ürün" value={product} />
            <Info title="Miktar" value={`${quantity} ${unit}`} />
          </div>

          <div style={{marginTop:22,background:'#243041',borderRadius:16,padding:18}}>
            <Row label="Ara Toplam" value={`${subtotal} ₺`} />
            <Row label="KDV" value={`${vat} ₺`} />
            <div style={{height:1,background:'rgba(255,255,255,.12)',margin:'12px 0'}} />
            <Row label="Genel Toplam" value={`${total} ₺`} strong />
          </div>

          <div style={{display:'flex',gap:12,flexWrap:'wrap',marginTop:22}}>
            <a href={`/proposal/print?${qs}`} target="_blank" style={primaryBtn}>PDF / Yazdır</a>
            <a href={`/calculator`} style={secondaryBtn}>Yeni Teklif</a>
          </div>
        </div>
      </section>
    </main>
  );
}

function Info({ title, value }: { title: string; value: string }){
  return <div style={{background:'#243041',padding:14,borderRadius:14}}><div style={{color:'#aab7cc',fontSize:13}}>{title}</div><strong>{value}</strong></div>;
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }){
  return <div style={{display:'flex',justifyContent:'space-between',gap:12,padding:'7px 0',fontSize:strong ? 20 : 15}}><span>{label}</span><strong>{value}</strong></div>;
}

const primaryBtn = {display:'inline-flex',padding:'12px 16px',borderRadius:12,background:'#d83939',color:'#fff',textDecoration:'none',fontWeight:900};
const secondaryBtn = {display:'inline-flex',padding:'12px 16px',borderRadius:12,background:'#243041',color:'#fff',textDecoration:'none',fontWeight:900};
