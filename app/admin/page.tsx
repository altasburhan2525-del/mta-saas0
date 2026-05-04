import Shell from '@/components/Shell';
import { demoDealers } from '@/lib/mockDb';

export default function AdminPage(){
  return <Shell title="Süper Admin Paneli"><p className="muted">Bayi, kullanıcı, paket ve sistem ayarları.</p><table className="table"><thead><tr><th>Bayi</th><th>Şehir</th><th>Telefon</th><th>Durum</th></tr></thead><tbody>{demoDealers.map(d=><tr key={d.id}><td>{d.name}</td><td>{d.city}</td><td>{d.phone}</td><td>{d.status}</td></tr>)}</tbody></table></Shell>;
}
