import Link from 'next/link';

export default function Shell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="page">
      <div className="nav"><Link className="brand" href="/">MT Altaş SaaS</Link><span className="badge">v1 Core</span></div>
      <div className="layout">
        <aside className="sidebar">
          <Link className="sideitem" href="/dashboard">Dashboard</Link>
          <Link className="sideitem" href="/admin">Admin</Link>
          <Link className="sideitem" href="/dealer">Bayi Paneli</Link>
          <Link className="sideitem" href="/proposal/demo">Teklif Görüntüle</Link>
        </aside>
        <section className="card"><h1>{title}</h1>{children}</section>
      </div>
    </main>
  );
}
