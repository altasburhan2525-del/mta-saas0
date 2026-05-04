import Link from 'next/link';

export default function Nav() {
  return (
    <div className="nav">
      <Link href="/" className="brand">MT Altaş SaaS</Link>
      <div className="row">
        <Link className="btn secondary" href="/login">Giriş</Link>
        <Link className="btn" href="/dashboard">Panel</Link>
      </div>
    </div>
  );
}
