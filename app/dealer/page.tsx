import Shell from '@/components/Shell';
import MtaCalculatorEmbed from '@/components/MtaCalculatorEmbed';

export default function DealerPage(){
  return <Shell title="Bayi Paneli"><p className="muted">Bayi burada müşteri tekliflerini hazırlar, firma logosu ile PDF üretir.</p><div className="row"><button className="btn">Yeni Teklif</button><button className="btn secondary">Geçmiş Teklifler</button></div><div style={{height:18}}/><MtaCalculatorEmbed/></Shell>;
}
