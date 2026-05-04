export default function CalculatorCorePage(){
  return (
    <main className="mta-core-shell">
      <header className="mta-core-topbar">
        <div className="mta-saas-brand"><span>MT</span><strong>Altaş Core Engine</strong></div>
        <nav className="mta-core-actions">
          <a href="/">Giriş</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/calculator/core" className="active">Core</a>
        </nav>
      </header>
      <section className="mta-core-frame-card">
        <iframe
          title="MT Altaş Hesaplayıcı Core"
          src="/legacy/mt-altas-hesaplayici.html.html"
          className="mta-core-frame"
        />
      </section>
    </main>
  );
}
