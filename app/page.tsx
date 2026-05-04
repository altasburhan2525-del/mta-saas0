export default function Home() {
  return (
    <section className="mt-card mt-hero">
      <span className="mt-badge">CANLI HESAPLAYICI</span>
      <h1 className="mt-title">MT Altaş Hesaplayıcı</h1>
      <p className="mt-sub">Gerçek çalışan HTML hesaplayıcı ana ürün olarak yayındadır. SaaS panel, bayi yönetimi ve teklif takibi bu güçlü hesaplayıcının etrafında geliştirilecektir.</p>
      <div className="mt-actions" style={{justifyContent:'center',marginTop:24}}>
        <a href="/legacy/mt-altas-hesaplayici.html.html" className="mt-btn">Hesaplayıcıyı Aç</a>
        <a href="/dashboard" className="mt-btn secondary">SaaS Panel</a>
        <a href="/embed" className="mt-btn secondary">Yayınlama Kodu</a>
      </div>
    </section>
  );
}
