import Link from 'next/link';
import { demoProposals } from '@/lib/mockDb';

type ProposalPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProposalPage({ params }: ProposalPageProps){
  const { id } = await params;
  const proposal = demoProposals.find(p => p.id === id) || demoProposals[0];
  return <main className="page"><div className="nav"><Link className="brand" href="/">MT Altaş SaaS</Link><span className="badge">Teklif</span></div><section className="card"><h1>Kurumsal Teklif</h1><p className="muted">Teklif No: {proposal.id}</p><table className="table"><tbody><tr><td>Müşteri</td><td>{proposal.customerName}</td></tr><tr><td>Durum</td><td>{proposal.status}</td></tr><tr><td>Genel Toplam</td><td>{proposal.total.toLocaleString('tr-TR')} {proposal.currency}</td></tr></tbody></table><div className="row" style={{marginTop:18}}><button className="btn">PDF İndir</button><button className="btn secondary">Teklifi Onayla</button></div></section></main>;
}
