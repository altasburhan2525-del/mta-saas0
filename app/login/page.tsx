import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="page">
      <div className="nav"><Link className="brand" href="/">MT Altaş SaaS</Link><span className="badge">Giriş</span></div>
      <section className="card" style={{maxWidth:480,margin:'40px auto'}}>
        <h1>Panele Giriş</h1>
        <p className="muted">Demo: admin@mta.local / demo123</p>
        <form action="/api/auth/login" method="post">
          <label>E-posta</label><input name="email" type="email" defaultValue="admin@mta.local" />
          <div style={{height:12}} />
          <label>Şifre</label><input name="password" type="password" defaultValue="demo123" />
          <div style={{height:18}} />
          <button className="btn" type="submit">Giriş Yap</button>
        </form>
      </section>
    </main>
  );
}
