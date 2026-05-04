import Link from 'next/link';
import Nav from '@/components/Nav';

export default function HomePage() {
  return (
    <main className="page">
      <Nav />
      <section className="hero">
        <span className="badge">app.mtaltasinsaat.com</span>
        <h1>MTA hesaplayıcı artık bayi odaklı SaaS platformu.</h1>
        <p>Firmalar kendi logolarıyla teklif oluşturur, hesaplama geçmişini yönetir, müşteriye PDF/WhatsApp teklif gönderir.</p>
        <div className="row" style={{justifyContent:'center',marginTop:24}}>
          <Link className="btn" href="/login">Sisteme Giriş</Link>
          <Link className="btn secondary" href="/proposal/demo">Demo Teklif</Link>
        </div>
      </section>
      <section className="grid">
        <div className="card"><h3>Admin</h3><p className="muted">Bayi, paket, kullanıcı ve sistem ayarlarını yönetir.</p></div>
        <div className="card"><h3>Bayi</h3><p className="muted">Müşterilerine kurumsal teklif hazırlar.</p></div>
        <div className="card"><h3>Müşteri</h3><p className="muted">Teklifi görüntüler, indirir ve onay akışına girer.</p></div>
      </section>
      <div className="footer">© MT Altaş SaaS v1</div>
    </main>
  );
}
