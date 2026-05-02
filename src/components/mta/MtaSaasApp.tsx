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
  const result = useMemo(
    () => calculateOffer({ area, unitPrice, laborPrice, shipping, vatRate }),
    [area, unitPrice, laborPrice, shipping, vatRate]
  );
  const locale = meta.locale;

  return (
    <main dir={meta.dir} style={styles.page}>
      <section style={styles.shell}>
        <div style={styles.header}>
          <div>
            <span style={styles.badge}>MT Altaş SaaS</span>
            <h1 style={styles.title}>{T('title')}</h1>
            <p style={styles.subtitle}>{T('sub')}</p>
          </div>
          <select style={styles.select} value={lang} onChange={(e) => setLang(e.target.value as any)}>
            {langs.map((l) => (
              <option key={l} value={l}>
                {LANG_META[l].flag} {LANG_META[l].name}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.grid}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>{T('company')}</h2>
            <div style={styles.formGrid}>
              <Field label={T('area')} value={area} setValue={setArea} />
              <Field label={T('unit')} value={unitPrice} setValue={setUnitPrice} />
              <Field label={T('labor')} value={laborPrice} setValue={setLabor} />
              <Field label={T('shipping')} value={shipping} setValue={setShipping} />
              <Field label={T('vat')} value={vatRate * 100} setValue={(v) => setVatRate(v / 100)} />
            </div>
          </div>

          <div style={styles.resultCard}>
            <p style={styles.note}>{T('note')}</p>
            <div style={styles.rows}>
              <Row k={T('subtotal')} v={money(result.subtotal, locale)} />
              <Row k={T('vatTotal')} v={money(result.vat, locale)} />
              <Row k={T('total')} v={money(result.total, locale)} strong />
            </div>
            <button onClick={() => downloadProposal(lang, result)} style={styles.button}>
              {T('offer')}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({ label, value, setValue }: { label: string; value: number; setValue: (v: number) => void }) {
  return (
    <label style={styles.field}>
      <span style={styles.label}>{label}</span>
      <input type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} style={styles.input} />
    </label>
  );
}

function Row({ k, v, strong }: { k: string; v: string; strong?: boolean }) {
  return (
    <div style={styles.row}>
      <span style={styles.rowKey}>{k}</span>
      <b style={strong ? styles.rowStrong : styles.rowValue}>{v}</b>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: 'linear-gradient(135deg,#0f1724,#111827 48%,#1f2937)', color: '#fff', padding: '28px 16px', fontFamily: 'Arial, sans-serif' },
  shell: { maxWidth: 1120, margin: '0 auto', borderRadius: 28, border: '1px solid rgba(255,255,255,.12)', background: 'rgba(24,34,52,.95)', padding: 24, boxShadow: '0 24px 80px rgba(0,0,0,.35)' },
  header: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 18, flexWrap: 'wrap' },
  badge: { display: 'inline-flex', border: '1px solid rgba(251,191,36,.35)', background: 'rgba(251,191,36,.12)', color: '#fde68a', borderRadius: 999, padding: '7px 12px', fontSize: 12, fontWeight: 800 },
  title: { margin: '14px 0 8px', fontSize: 'clamp(30px,5vw,54px)', lineHeight: 1.03, fontWeight: 900 },
  subtitle: { margin: 0, maxWidth: 680, color: '#cbd5e1', fontSize: 16, lineHeight: 1.6 },
  select: { height: 44, borderRadius: 14, padding: '0 12px', border: '1px solid rgba(255,255,255,.18)', background: '#fff', color: '#111827', fontWeight: 800 },
  grid: { display: 'grid', gridTemplateColumns: 'minmax(0,1.15fr) minmax(320px,.85fr)', gap: 18, marginTop: 24 },
  card: { borderRadius: 22, border: '1px solid rgba(255,255,255,.12)', background: 'rgba(31,42,61,.92)', padding: 20 },
  cardTitle: { margin: '0 0 16px', fontSize: 22, fontWeight: 900 },
  formGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))', gap: 14 },
  field: { display: 'block' },
  label: { display: 'block', marginBottom: 6, color: '#cbd5e1', fontSize: 13, fontWeight: 800 },
  input: { width: '100%', height: 48, boxSizing: 'border-box', borderRadius: 14, border: '1px solid rgba(255,255,255,.16)', background: '#fff', color: '#111827', padding: '0 12px', fontSize: 15, fontWeight: 800, outline: 'none' },
  resultCard: { borderRadius: 22, border: '1px solid rgba(52,211,153,.28)', background: 'rgba(16,185,129,.11)', padding: 20 },
  note: { margin: 0, color: '#d1fae5', fontSize: 15, fontWeight: 800, lineHeight: 1.5 },
  rows: { marginTop: 24 },
  row: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,.12)' },
  rowKey: { color: '#cbd5e1', fontSize: 14 },
  rowValue: { color: '#fff', fontSize: 16 },
  rowStrong: { color: '#fff', fontSize: 24, fontWeight: 900 },
  button: { marginTop: 24, width: '100%', border: 0, borderRadius: 18, background: '#10b981', color: '#fff', padding: '15px 18px', fontSize: 16, fontWeight: 900, cursor: 'pointer', boxShadow: '0 16px 40px rgba(16,185,129,.28)' },
};
