'use client';

import { useMemo, useState } from 'react';
import { defaultProducts, type AdminProduct } from '@/data/adminStore';

const STORAGE_KEY = 'mta_admin_products_v1';
const PASS_KEY = 'mta_admin_pass_ok';
const ADMIN_PASS = '1234';

type Draft = Omit<AdminProduct, 'id'>;

const emptyDraft: Draft = {
  name: '',
  unit: 'm²',
  price: 0,
  category: 'Genel',
  active: true,
};

export default function AdminPage() {
  const [pass, setPass] = useState('');
  const [auth, setAuth] = useState(false);
  const [products, setProducts] = useState<AdminProduct[]>(defaultProducts);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [search, setSearch] = useState('');
  const [vatRate, setVatRate] = useState(20);
  const [savedAt, setSavedAt] = useState('');

  const login = () => {
    if (pass === ADMIN_PASS) {
      setAuth(true);
      if (typeof window !== 'undefined') window.sessionStorage.setItem(PASS_KEY, '1');
      loadLocal();
    } else alert('Şifre yanlış');
  };

  const loadLocal = () => {
    try {
      const raw = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;
      if (raw) setProducts(JSON.parse(raw));
    } catch {}
  };

  const saveLocal = (next = products) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setSavedAt(new Date().toLocaleString('tr-TR'));
    }
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => `${p.name} ${p.unit} ${p.category}`.toLowerCase().includes(q));
  }, [products, search]);

  const addProduct = () => {
    if (!draft.name.trim()) return alert('Ürün adı gerekli');
    const next = [{ ...draft, id: `prd-${Date.now()}` }, ...products];
    setProducts(next);
    setDraft(emptyDraft);
    saveLocal(next);
  };

  const updateProduct = (id: string, patch: Partial<AdminProduct>) => {
    const next = products.map((p) => (p.id === id ? { ...p, ...patch } : p));
    setProducts(next);
    saveLocal(next);
  };

  const deleteProduct = (id: string) => {
    if (!confirm('Bu ürünü silmek istiyor musun?')) return;
    const next = products.filter((p) => p.id !== id);
    setProducts(next);
    saveLocal(next);
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify({ products, vatRate, exportedAt: new Date().toISOString() }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mta-admin-products.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!auth) {
    return (
      <main style={styles.loginPage}>
        <section style={styles.loginCard}>
          <span style={styles.badge}>MT Altaş Admin</span>
          <h1 style={styles.loginTitle}>Yönetim Paneli</h1>
          <p style={styles.loginSub}>Ürün, fiyat, KDV ve teklif altyapısını buradan yöneteceksin.</p>
          <input style={styles.loginInput} type="password" placeholder="Admin şifresi" value={pass} onChange={(e) => setPass(e.target.value)} onKeyDown={(e)=>{if(e.key==='Enter') login();}} />
          <button style={styles.primaryBtn} onClick={login}>Giriş Yap</button>
        </section>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <section style={styles.shell}>
        <header style={styles.header}>
          <div>
            <span style={styles.badge}>Commercial Admin Console</span>
            <h1 style={styles.title}>MT Altaş Yönetim Paneli</h1>
            <p style={styles.sub}>Ürün ekle, fiyat değiştir, aktif/pasif yap, JSON yedek al. Backend bağlantısına hazır ticari panel.</p>
          </div>
          <div style={styles.actions}>
            <button style={styles.secondaryBtn} onClick={() => saveLocal()}>Kaydet</button>
            <button style={styles.secondaryBtn} onClick={exportJson}>JSON Yedek Al</button>
          </div>
        </header>

        <div style={styles.kpis}>
          <Kpi title="Ürün" value={String(products.length)} />
          <Kpi title="Aktif" value={String(products.filter(p=>p.active).length)} />
          <Kpi title="KDV" value={`%${vatRate}`} />
          <Kpi title="Son kayıt" value={savedAt || 'Bekliyor'} small />
        </div>

        <div style={styles.grid}>
          <section style={styles.card}>
            <h2 style={styles.cardTitle}>Yeni ürün / hizmet ekle</h2>
            <div style={styles.formGrid}>
              <Text label="Ürün adı" value={draft.name} onChange={(v)=>setDraft({...draft,name:v})} />
              <Text label="Kategori" value={draft.category} onChange={(v)=>setDraft({...draft,category:v})} />
              <Text label="Birim" value={draft.unit} onChange={(v)=>setDraft({...draft,unit:v})} />
              <NumberInput label="Fiyat" value={draft.price} onChange={(v)=>setDraft({...draft,price:v})} />
            </div>
            <button style={styles.primaryBtn} onClick={addProduct}>Ürün Ekle</button>
          </section>

          <section style={styles.card}>
            <h2 style={styles.cardTitle}>Genel ayarlar</h2>
            <NumberInput label="Varsayılan KDV oranı" value={vatRate} onChange={setVatRate} />
            <p style={styles.hint}>Not: Bu panel şu an tarayıcıda kalıcı kayıt yapar. Supabase bağlanınca gerçek veritabanına taşınacak.</p>
          </section>
        </div>

        <section style={styles.tableCard}>
          <div style={styles.tableHead}>
            <h2 style={styles.cardTitle}>Ürün ve fiyat yönetimi</h2>
            <input style={styles.search} placeholder="Ürün ara..." value={search} onChange={(e)=>setSearch(e.target.value)} />
          </div>
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr><th>Durum</th><th>Ürün</th><th>Kategori</th><th>Birim</th><th>Fiyat</th><th>İşlem</th></tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id}>
                    <td><input type="checkbox" checked={p.active} onChange={(e)=>updateProduct(p.id,{active:e.target.checked})} /></td>
                    <td><input style={styles.cellInput} value={p.name} onChange={(e)=>updateProduct(p.id,{name:e.target.value})} /></td>
                    <td><input style={styles.cellInput} value={p.category} onChange={(e)=>updateProduct(p.id,{category:e.target.value})} /></td>
                    <td><input style={styles.cellInputSmall} value={p.unit} onChange={(e)=>updateProduct(p.id,{unit:e.target.value})} /></td>
                    <td><input style={styles.cellInputSmall} type="number" value={p.price} onChange={(e)=>updateProduct(p.id,{price:Number(e.target.value)})} /></td>
                    <td><button style={styles.dangerBtn} onClick={()=>deleteProduct(p.id)}>Sil</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  );
}

function Kpi({ title, value, small }: { title: string; value: string; small?: boolean }) {
  return <div style={styles.kpi}><span>{title}</span><b style={small ? styles.kpiSmall : styles.kpiValue}>{value}</b></div>;
}

function Text({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return <label style={styles.field}><span>{label}</span><input style={styles.input} value={value} onChange={(e)=>onChange(e.target.value)} /></label>;
}

function NumberInput({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return <label style={styles.field}><span>{label}</span><input style={styles.input} type="number" value={value} onChange={(e)=>onChange(Number(e.target.value))} /></label>;
}

const styles: Record<string, React.CSSProperties> = {
  loginPage: { minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'radial-gradient(circle at top,#1e3a8a,#020617)', color: '#fff', fontFamily: 'Arial,sans-serif', padding: 20 },
  loginCard: { width: '100%', maxWidth: 440, borderRadius: 28, border: '1px solid rgba(255,255,255,.14)', background: 'rgba(15,23,42,.88)', padding: 28, boxShadow: '0 30px 100px rgba(0,0,0,.45)' },
  loginTitle: { margin: '14px 0 8px', fontSize: 38, letterSpacing: '-.04em' },
  loginSub: { color: '#cbd5e1', lineHeight: 1.6 },
  loginInput: { width: '100%', height: 52, borderRadius: 16, border: 0, padding: '0 14px', fontSize: 16, fontWeight: 800, boxSizing: 'border-box', margin: '16px 0 12px' },
  page: { minHeight: '100vh', background: '#020617', color: '#fff', padding: '28px 16px', fontFamily: 'Arial,sans-serif' },
  shell: { maxWidth: 1180, margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', borderRadius: 28, border: '1px solid rgba(255,255,255,.12)', background: 'linear-gradient(135deg,rgba(30,64,175,.38),rgba(15,23,42,.9))', padding: 24 },
  badge: { display: 'inline-flex', borderRadius: 999, background: 'rgba(251,191,36,.14)', color: '#fde68a', border: '1px solid rgba(251,191,36,.3)', padding: '7px 11px', fontWeight: 900, fontSize: 12 },
  title: { margin: '12px 0 8px', fontSize: 'clamp(34px,5vw,58px)', lineHeight: 1, letterSpacing: '-.05em' },
  sub: { margin: 0, color: '#cbd5e1', maxWidth: 680, lineHeight: 1.6 },
  actions: { display: 'flex', gap: 10, alignItems: 'flex-start', flexWrap: 'wrap' },
  kpis: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 14, marginTop: 16 },
  kpi: { borderRadius: 22, border: '1px solid rgba(255,255,255,.1)', background: 'rgba(255,255,255,.06)', padding: 18 },
  kpiValue: { display: 'block', marginTop: 8, fontSize: 30 },
  kpiSmall: { display: 'block', marginTop: 8, fontSize: 15, color: '#d1fae5' },
  grid: { display: 'grid', gridTemplateColumns: 'minmax(0,1.3fr) minmax(280px,.7fr)', gap: 16, marginTop: 16 },
  card: { borderRadius: 24, border: '1px solid rgba(255,255,255,.1)', background: 'rgba(15,23,42,.86)', padding: 20 },
  cardTitle: { margin: '0 0 16px', fontSize: 22 },
  formGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: 12 },
  field: { display: 'grid', gap: 6, color: '#dbeafe', fontWeight: 900, fontSize: 13 },
  input: { height: 48, borderRadius: 14, border: 0, padding: '0 12px', fontSize: 15, fontWeight: 800, color: '#111827' },
  primaryBtn: { border: 0, borderRadius: 16, background: 'linear-gradient(135deg,#10b981,#14b8a6)', color: '#fff', padding: '14px 18px', marginTop: 14, fontWeight: 950, cursor: 'pointer' },
  secondaryBtn: { border: '1px solid rgba(255,255,255,.16)', borderRadius: 16, background: 'rgba(255,255,255,.08)', color: '#fff', padding: '13px 16px', fontWeight: 900, cursor: 'pointer' },
  dangerBtn: { border: 0, borderRadius: 12, background: '#ef4444', color: '#fff', padding: '9px 12px', fontWeight: 900, cursor: 'pointer' },
  hint: { color: '#cbd5e1', lineHeight: 1.6, fontSize: 13 },
  tableCard: { marginTop: 16, borderRadius: 24, border: '1px solid rgba(255,255,255,.1)', background: 'rgba(15,23,42,.86)', padding: 20 },
  tableHead: { display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'center' },
  search: { height: 44, borderRadius: 14, border: 0, padding: '0 12px', minWidth: 240, fontWeight: 800 },
  tableWrap: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', minWidth: 760 },
  cellInput: { width: '100%', height: 38, borderRadius: 10, border: '1px solid #e5e7eb', padding: '0 10px', fontWeight: 800 },
  cellInputSmall: { width: 110, height: 38, borderRadius: 10, border: '1px solid #e5e7eb', padding: '0 10px', fontWeight: 800 },
};
