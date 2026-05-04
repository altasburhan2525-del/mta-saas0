'use client';

import { useEffect, useRef, useState } from 'react';

export default function MtaCoreDirect(){
  const hostRef = useRef<HTMLDivElement | null>(null);
  const loadedRef = useRef(false);
  const [status, setStatus] = useState('Core yükleniyor...');

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
        setStatus('Core doğrudan DOM içine bağlandı.');
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
