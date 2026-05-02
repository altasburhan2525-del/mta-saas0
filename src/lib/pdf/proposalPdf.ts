import type { CalcResult, LangCode } from '@/types/offer';
import { DICT, LANG_META } from '@/lib/i18n/dictionaries';

const today = () => new Date().toLocaleDateString('tr-TR');

const money = (value: number) =>
  new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(value);

export function downloadProposal(lang: LangCode, result: CalcResult) {
  const d = DICT[lang];
  const meta = LANG_META[lang];
  const dir = meta?.dir || 'ltr';
  const title = d.title || 'MT Altaş Hesaplayıcı';
  const fileDate = new Date().toISOString().slice(0, 10);

  const html = `<!doctype html>
<html lang="${lang}" dir="${dir}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title} - Teklif Belgesi</title>
<style>
  *{box-sizing:border-box}
  body{margin:0;background:#eef2f7;color:#111827;font-family:Arial,Helvetica,sans-serif;line-height:1.45}
  .page{max-width:900px;margin:28px auto;background:#fff;border-radius:22px;overflow:hidden;box-shadow:0 24px 80px rgba(15,23,42,.16)}
  .top{background:linear-gradient(135deg,#111827,#1f2937);color:#fff;padding:34px 38px;display:flex;justify-content:space-between;gap:24px;align-items:flex-start}
  .brand{display:flex;gap:16px;align-items:center}
  .logo{width:62px;height:62px;border-radius:18px;background:#f59e0b;color:#111827;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:22px;box-shadow:inset 0 0 0 2px rgba(255,255,255,.25)}
  .brand h1{margin:0;font-size:28px;letter-spacing:-.03em}
  .brand p{margin:6px 0 0;color:#cbd5e1;font-size:13px}
  .doc-meta{text-align:right;font-size:13px;color:#d1d5db}
  [dir="rtl"] .doc-meta{text-align:left}
  .doc-meta b{display:block;color:#fff;font-size:15px;margin-bottom:4px}
  .content{padding:34px 38px}
  .info{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:24px}
  .box{border:1px solid #e5e7eb;border-radius:16px;padding:16px;background:#f8fafc}
  .box h3{margin:0 0 8px;font-size:13px;color:#6b7280;text-transform:uppercase;letter-spacing:.08em}
  .box p{margin:0;font-size:15px;font-weight:700;color:#111827}
  table{width:100%;border-collapse:separate;border-spacing:0;overflow:hidden;border:1px solid #e5e7eb;border-radius:16px;margin-top:14px}
  th{background:#f3f4f6;color:#374151;text-align:left;font-size:13px;padding:14px 16px}
  [dir="rtl"] th{text-align:right}
  td{padding:16px;border-top:1px solid #e5e7eb;font-size:14px}
  td:last-child,th:last-child{text-align:right;font-weight:800}
  [dir="rtl"] td:last-child,[dir="rtl"] th:last-child{text-align:left}
  .totals{margin-top:24px;margin-left:auto;max-width:380px;border:1px solid #e5e7eb;border-radius:18px;overflow:hidden}
  [dir="rtl"] .totals{margin-left:0;margin-right:auto}
  .line{display:flex;justify-content:space-between;gap:16px;padding:14px 18px;border-bottom:1px solid #e5e7eb;background:#fff}
  .line:last-child{border-bottom:0;background:#111827;color:#fff;font-size:20px;font-weight:900}
  .note{margin-top:24px;border-radius:18px;background:#ecfdf5;border:1px solid #a7f3d0;padding:16px;color:#065f46;font-size:13px}
  .footer{padding:20px 38px;background:#f8fafc;border-top:1px solid #e5e7eb;color:#6b7280;font-size:12px;display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap}
  .print{position:fixed;right:24px;bottom:24px;border:0;border-radius:999px;background:#10b981;color:#fff;padding:14px 20px;font-weight:900;box-shadow:0 18px 50px rgba(16,185,129,.35);cursor:pointer}
  @media print{body{background:#fff}.page{margin:0;max-width:none;border-radius:0;box-shadow:none}.print{display:none}}
  @media(max-width:700px){.top,.content,.footer{padding:24px}.top,.info{grid-template-columns:1fr;display:block}.doc-meta{text-align:left;margin-top:20px}.info{display:grid;grid-template-columns:1fr}.totals{max-width:none}.brand h1{font-size:22px}}
</style>
</head>
<body>
  <button class="print" onclick="window.print()">PDF / Yazdır</button>
  <main class="page">
    <section class="top">
      <div class="brand">
        <div class="logo">MT</div>
        <div>
          <h1>MT Altaş</h1>
          <p>Profesyonel teklif ve maliyet hesaplama belgesi</p>
        </div>
      </div>
      <div class="doc-meta">
        <b>TEKLİF BELGESİ</b>
        <span>Tarih: ${today()}</span><br />
        <span>Dil: ${meta?.name || lang.toUpperCase()}</span>
      </div>
    </section>

    <section class="content">
      <div class="info">
        <div class="box">
          <h3>Firma</h3>
          <p>MT Altaş İnşaat</p>
        </div>
        <div class="box">
          <h3>Proje</h3>
          <p>Hesaplama ve teklif özeti</p>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Açıklama</th>
            <th>Tutar</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>${d.subtotal}</td><td>${money(result.subtotal)}</td></tr>
          <tr><td>${d.vatTotal}</td><td>${money(result.vat)}</td></tr>
        </tbody>
      </table>

      <div class="totals">
        <div class="line"><span>${d.subtotal}</span><b>${money(result.subtotal)}</b></div>
        <div class="line"><span>${d.vatTotal}</span><b>${money(result.vat)}</b></div>
        <div class="line"><span>${d.total}</span><b>${money(result.total)}</b></div>
      </div>

      <div class="note">
        Bu belge MT Altaş Hesaplayıcı üzerinden otomatik oluşturulmuştur. Nihai teklif; proje keşfi, uygulama koşulları ve firma onayı sonrası kesinleşir.
      </div>
    </section>

    <footer class="footer">
      <span>MT Altaş Hesaplayıcı</span>
      <span>app.mtaltasinsaat.com</span>
    </footer>
  </main>
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `MT-Altas-Kurumsal-Teklif-${fileDate}-${lang.toUpperCase()}.html`;
  a.click();
  URL.revokeObjectURL(url);
}
