'use client';

import { useEffect, useRef, useState } from 'react';

type SyncPayload = {
  project?: string;
  customer?: string;
  city?: string;
  area?: number;
  depth?: number;
  distance?: number;
  vat?: number;
  fuel?: number;
  cement?: number;
  sand?: number;
};

function setInputValue(root: ParentNode, selectors: string[], value: string | number | undefined){
  if (value === undefined || value === null) return;
  const el = selectors.map((s)=>root.querySelector<HTMLInputElement | HTMLSelectElement>(s)).find(Boolean);
  if (!el) return;
  el.value = String(value);
  el.dispatchEvent(new Event('input', { bubbles: true }));
  el.dispatchEvent(new Event('change', { bubbles: true }));
}

function syncCore(payload: SyncPayload){
  const root = document.querySelector('#mta11-smart-calc-root');
  if (!root) return;

  setInputValue(root, ['#mta11_area', '#mta11_m2', 'input[name="area"]', 'input[id*="area"]', 'input[id*="m2"]'], payload.area);
  setInputValue(root, ['#mta11_distance', '#mta11_km', 'input[name="distance"]', 'input[id*="distance"]', 'input[id*="km"]'], payload.distance);
  setInputValue(root, ['#mta11_vat', '#mta11_kdv', 'select[name="vat"]', 'select[id*="kdv"]', 'input[id*="kdv"]'], payload.vat);
  setInputValue(root, ['#mta11_project', '#mta11_prop_project', 'input[name="project"]', 'input[id*="project"]'], payload.project);
  setInputValue(root, ['#mta11_customer', '#mta11_prop_customer', 'input[name="customer"]', 'input[id*="customer"]'], payload.customer);
  setInputValue(root, ['#mta11_fuel_price', '#mta11_diesel_price', 'input[id*="fuel"]', 'input[id*="mazot"]'], payload.fuel);
  setInputValue(root, ['#mta11_cement_price', 'input[id*="cement"]', 'input[id*="cimento"]'], payload.cement);
  setInputValue(root, ['#mta11_sand_price', 'input[id*="sand"]', 'input[id*="kum"]'], payload.sand);

  const calcBtn = root.querySelector<HTMLButtonElement>('#mta11_calculate_btn, button[id*="calculate"], button[data-action="calculate"]');
  calcBtn?.click();
}

export default function MtaCoreDirect(){
  const hostRef = useRef<HTMLDivElement | null>(null);
  const loadedRef = useRef(false);
  const [status, setStatus] = useState('Core yükleniyor...');

  useEffect(() => {
    const onSync = (event: Event) => syncCore((event as CustomEvent<SyncPayload>).detail || {});
    window.addEventListener('mta-saas-sync-core', onSync);
    return () => window.removeEventListener('mta-saas-sync-core', onSync);
  }, []);

  useEffect(() => {
    if (loadedRef.current || !hostRef.current) return;
    loadedRef.current = true;
    let alive = true;

    fetch('/legacy/mt-altas-hesaplayici.html.html')
      .then((res) => {
        if (!res.ok) throw new Error('Core HTML bulunamadı');
        return res.text();
      })
      .then((html) => {
        if (!alive || !hostRef.current) return;
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const root = doc.querySelector('#mta11-smart-calc-root');
        if (!root) throw new Error('mta11-smart-calc-root bulunamadı');
        hostRef.current.innerHTML = '';
        hostRef.current.appendChild(document.importNode(root, true));
        doc.querySelectorAll('script').forEach((oldScript) => {
          const script = document.createElement('script');
          Array.from(oldScript.attributes).forEach((attr) => script.setAttribute(attr.name, attr.value));
          script.text = oldScript.textContent || '';
          document.body.appendChild(script);
        });
        setStatus('Core doğrudan DOM içine bağlandı ve senkron köprüsü aktif.');
        setTimeout(() => window.dispatchEvent(new CustomEvent('mta-saas-core-ready')), 300);
      })
      .catch((err) => setStatus(`Core bağlanamadı: ${err.message}`));

    return () => { alive = false; };
  }, []);

  return (
    <div className="mta-direct-core-wrap">
      <div className="mta-direct-core-status">{status}</div>
      <div ref={hostRef} className="mta-direct-core-host" />
    </div>
  );
}
