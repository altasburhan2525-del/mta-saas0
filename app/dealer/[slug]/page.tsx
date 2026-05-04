import { getDealerBySlug } from '@/lib/dealers';

type DealerPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function DealerPage({ params }: DealerPageProps){
  const { slug } = await params;
  const dealer = getDealerBySlug(slug);

  const legacyUrl = `/legacy/mt-altas-hesaplayici.html.html?dealer=${dealer.slug}&color=${encodeURIComponent(dealer.themeColor)}&vat=${dealer.vatRate}&phone=${dealer.phone}&name=${encodeURIComponent(dealer.name)}`;

  return (
    <main style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#0f1724',color:'#fff'}}>
      <div style={{textAlign:'center'}}>
        <h1>{dealer.name}</h1>
        <p>Bayi hesaplayıcı yükleniyor...</p>
        <a href={legacyUrl} style={{display:'inline-block',marginTop:20,padding:'14px 20px',background:'#d83939',borderRadius:12,color:'#fff',textDecoration:'none',fontWeight:900}}>Hesaplayıcıyı Aç</a>
      </div>
    </main>
  );
}
