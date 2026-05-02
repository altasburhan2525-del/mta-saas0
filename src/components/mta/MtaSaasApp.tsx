'use client';

import { useMemo, useState } from 'react';
import { calculateOffer, money } from '@/lib/calc/mtaCalcCore';
import { useMtaLang } from '@/lib/i18n/useMtaLang';
import { LANG_META } from '@/lib/i18n/dictionaries';
import { downloadProposal } from '@/lib/pdf/proposalPdf';

export default function MtaSaasApp() {
  const { lang, setLang, T, langs, meta } = useMtaLang();
  const [area, setArea] = useState(100);
  const [unitPrice, setUnitPrice] = useState(350);
  const [laborPrice, setLabor] = useState(5000);
  const [shipping, setShipping] = useState(3500);
  const [vatRate, setVatRate] = useState(0.2);
  const result = useMemo(() => calculateOffer({ area, unitPrice, laborPrice, shipping, vatRate }), [area, unitPrice, laborPrice, shipping, vatRate]);
  const locale = meta.locale;

  return (
    <main dir={meta.dir} style={styles.page}>
      <div style={styles.glowOne} />
      <div style={styles.glowTwo} />
      <section style={styles.shell}>
        <header style={styles.header}>
          <div style={styles.brandBlock}>
            <span style={styles.badge}>MT Altaş AI SaaS • Global Edition</span>
            <h1 style={styles.title}>{T('title')}</h1>
            <p style={styles.subtitle}>{T('sub')}</p>
            <div style={styles.trustRow}>
              <span style={styles.trust}>6 Dil</span>
              <span style={styles.trust}>Kurumsal PDF</span>
              <span style={styles.trust}>Anlık Hesap</span>
              <span style={styles.trust}>Cloud SaaS</span>
            </div>
          </div>
          <div style={styles.topPanel}>
            <select style={styles.select} value={lang} onChange={(e) => setLang(e.target.value as any)}>
              {langs.map((l) => <option key={l} value={l}>{LANG_META[l].flag} {LANG_META[l].name}</option>)}
            </select>
            <div style={styles.scoreBox}>
              <span style={styles.scoreLabel}>Teklif Skoru</span>
              <b style={styles.scoreValue}>98%</b>
            </div>
          </div>
        </header>

        <div style={styles.kpiGrid}>
          <Kpi title="Toplam" value={money(result.total, locale)} hint="KDV dahil" />
          <Kpi title="KDV" value={money(result.vat, locale)} hint="otomatik" />
          <Kpi title="Durum" value="Hazır" hint="PDF indirilebilir" />
        </div>

        <div style={styles.grid}>
          <div style={styles.card}>
            <div style={styles.cardHead}>
              <div>
                <h2 style={styles.cardTitle}>{T('company')}</h2>
                <p style={styles.cardSub}>Maliyet kalemlerini gir, teklif tutarı anında hesaplansın.</p>
              </div>
              <span style={styles.live}>Canlı</span>
            </div>
            <div style={styles.formGrid}>
              <Field label={T('area')} value={area} setValue={setArea} />
              <Field label={T('unit')} value={unitPrice} setValue={setUnitPrice} />
              <Field label={T('labor')} value={laborPrice} setValue={setLabor} />
              <Field label={T('shipping')} value={shipping} setValue={setShipping} />
              <Field label={T('vat')} value={vatRate * 100} setValue={(v) => setVatRate(v / 100)} />
            </div>
          </div>

          <aside style={styles.resultCard}>
            <div style={styles.resultTop}>
              <p style={styles.note}>{T('note')}</p>
              <span style={styles.shield}>Güvenli Çıktı</span>
            </div>
            <div style={styles.rows}>
              <Row k={T('subtotal')} v={money(result.subtotal, locale)} />
              <Row k={T('vatTotal')} v={money(result.vat, locale)} />
              <Row k={T('total')} v={money(result.total, locale)} strong />
            </div>
            <button onClick={() => downloadProposal(lang, result)} style={styles.button}>{T('offer')}</button>
            <p style={styles.micro}>Belge, müşteriye gönderilebilir kurumsal formatta hazırlanır.</p>
          </aside>
        </div>
      </section>
    </main>
  );
}

function Kpi({ title, value, hint }: { title: string; value: string; hint: string }) {
  return <div style={styles.kpi}><span style={styles.kpiTitle}>{title}</span><b style={styles.kpiValue}>{value}</b><small style={styles.kpiHint}>{hint}</small></div>;
}

function Field({ label, value, setValue }: { label: string; value: number; setValue: (v: number) => void }) {
  return <label style={styles.field}><span style={styles.label}>{label}</span><input type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} style={styles.input} /></label>;
}

function Row({ k, v, strong }: { k: string; v: string; strong?: boolean }) {
  return <div style={styles.row}><span style={styles.rowKey}>{k}</span><b style={strong ? styles.rowStrong : styles.rowValue}>{v}</b></div>;
}

const styles: Record<string, React.CSSProperties> = {
  page: { position: 'relative', minHeight: '100vh', overflow: 'hidden', background: 'radial-gradient(circle at top left,#1e3a8a 0,#0f1724 32%,#020617 100%)', color: '#fff', padding: '34px 16px', fontFamily: 'Inter,Arial,sans-serif' },
  glowOne: { position: 'absolute', width: 420, height: 420, borderRadius: 999, background: 'rgba(16,185,129,.18)', filter: 'blur(60px)', top: -120, right: -90 },
  glowTwo: { position: 'absolute', width: 360, height: 360, borderRadius: 999, background: 'rgba(245,158,11,.13)', filter: 'blur(60px)', bottom: -120, left: -80 },
  shell: { position: 'relative', maxWidth: 1180, margin: '0 auto', borderRadius: 34, border: '1px solid rgba(255,255,255,.13)', background: 'linear-gradient(180deg,rgba(15,23,42,.93),rgba(15,23,42,.82))', padding: 26, boxShadow: '0 30px 100px rgba(0,0,0,.45)' },
  header: { display: 'flex', justifyContent: 'space-between', gap: 22, flexWrap: 'wrap' },
  brandBlock: { maxWidth: 760 },
  badge: { display: 'inline-flex', border: '1px solid rgba(251,191,36,.35)', background: 'rgba(251,191,36,.12)', color: '#fde68a', borderRadius: 999, padding: '8px 13px', fontSize: 12, fontWeight: 900 },
  title: { margin: '16px 0 8px', fontSize: 'clamp(38px,6vw,72px)', lineHeight: .96, fontWeight: 950, letterSpacing: '-.055em' },
  subtitle: { margin: 0, color: '#dbeafe', fontSize: 17, lineHeight: 1.65 },
  trustRow: { display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 18 },
  trust: { border: '1px solid rgba(255,255,255,.12)', background: 'rgba(255,255,255,.07)', borderRadius: 999, padding: '8px 11px', color: '#e5e7eb', fontSize: 12, fontWeight: 800 },
  topPanel: { display: 'grid', gap: 12, minWidth: 190 },
  select: { height: 48, borderRadius: 16, padding: '0 14px', border: '2px solid rgba(255,255,255,.9)', background: '#fff', color: '#111827', fontWeight: 900 },
  scoreBox: { borderRadius: 18, border: '1px solid rgba(255,255,255,.12)', background: 'rgba(255,255,255,.08)', padding: 14 },
  scoreLabel: { display: 'block', color: '#cbd5e1', fontSize: 12, fontWeight: 800 },
  scoreValue: { display: 'block', marginTop: 4, fontSize: 30, fontWeight: 950 },
  kpiGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))', gap: 14, marginTop: 26 },
  kpi: { borderRadius: 22, border: '1px solid rgba(255,255,255,.12)', background: 'rgba(255,255,255,.075)', padding: 18 },
  kpiTitle: { display: 'block', color: '#93c5fd', fontWeight: 900, fontSize: 13 },
  kpiValue: { display: 'block', marginTop: 8, fontSize: 26, fontWeight: 950 },
  kpiHint: { display: 'block', marginTop: 5, color: '#cbd5e1', fontWeight: 700 },
  grid: { display: 'grid', gridTemplateColumns: 'minmax(0,1.18fr) minmax(330px,.82fr)', gap: 18, marginTop: 18 },
  card: { borderRadius: 26, border: '1px solid rgba(255,255,255,.13)', background: 'rgba(30,41,59,.82)', padding: 22 },
  cardHead: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14, marginBottom: 16 },
  cardTitle: { margin: 0, fontSize: 25, fontWeight: 950 },
  cardSub: { margin: '7px 0 0', color: '#cbd5e1', fontSize: 13 },
  live: { borderRadius: 999, background: 'rgba(16,185,129,.16)', color: '#bbf7d0', padding: '7px 10px', fontSize: 12, fontWeight: 900 },
  formGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14 },
  field: { display: 'block' },
  label: { display: 'block', marginBottom: 7, color: '#dbeafe', fontSize: 13, fontWeight: 900 },
  input: { width: '100%', height: 52, boxSizing: 'border-box', borderRadius: 16, border: '1px solid rgba(255,255,255,.16)', background: '#fff', color: '#111827', padding: '0 14px', fontSize: 16, fontWeight: 900, outline: 'none' },
  resultCard: { borderRadius: 26, border: '1px solid rgba(45,212,191,.35)', background: 'linear-gradient(180deg,rgba(20,184,166,.18),rgba(15,118,110,.18))', padding: 22, boxShadow: '0 22px 70px rgba(20,184,166,.12)' },
  resultTop: { display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' },
  note: { margin: 0, color: '#d1fae5', fontSize: 15, fontWeight: 900, lineHeight: 1.5 },
  shield: { whiteSpace: 'nowrap', borderRadius: 999, background: 'rgba(255,255,255,.1)', padding: '7px 9px', color: '#ccfbf1', fontSize: 11, fontWeight: 900 },
  rows: { marginTop: 24 },
  row: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,.14)' },
  rowKey: { color: '#dbeafe', fontSize: 14 },
  rowValue: { color: '#fff', fontSize: 17 },
  rowStrong: { color: '#fff', fontSize: 29, fontWeight: 950 },
  button: { marginTop: 24, width: '100%', border: 0, borderRadius: 20, background: 'linear-gradient(135deg,#10b981,#14b8a6)', color: '#fff', padding: '17px 18px', fontSize: 17, fontWeight: 950, cursor: 'pointer', boxShadow: '0 18px 50px rgba(16,185,129,.32)' },
  micro: { margin: '12px 0 0', color: '#cbd5e1', fontSize: 12, textAlign: 'center' },
};
