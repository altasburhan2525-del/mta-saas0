import Shell from '@/components/Shell';
import MtaCalculatorEmbed from '@/components/MtaCalculatorEmbed';

export default function DashboardPage(){
  return <Shell title="Dashboard"><div className="grid"><div><span className="muted">Teklif</span><div className="kpi">24</div></div><div><span className="muted">Bayi</span><div className="kpi">3</div></div><div><span className="muted">Ciro</span><div className="kpi">₺1.2M</div></div></div><div style={{height:18}}/><MtaCalculatorEmbed/></Shell>;
}
