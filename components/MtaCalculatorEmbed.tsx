export default function MtaCalculatorEmbed() {
  return (
    <div className="mta-embed">
      <span className="badge">MTA Hesaplayıcı Entegrasyon Alanı</span>
      <h2>Kurumsal hesaplama motoru buraya bağlanacak</h2>
      <p className="muted">Mevcut tek parça HTML hesaplayıcı bu alana React bileşeni veya iframe modülü olarak taşınabilir. Teklif kaydı, PDF ve WhatsApp akışları API ile bağlanacak.</p>
      <div className="grid" style={{marginTop:16}}>
        <div className="card"><strong>Hesaplama</strong><p className="muted">Ürün, nakliye, işçilik, KDV</p></div>
        <div className="card"><strong>Teklif</strong><p className="muted">Bayi logosu ve müşteri bilgisi</p></div>
        <div className="card"><strong>PDF</strong><p className="muted">Kurumsal teklif çıktısı</p></div>
      </div>
    </div>
  );
}
