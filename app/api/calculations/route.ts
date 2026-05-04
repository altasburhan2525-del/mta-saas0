import { json } from '@/lib/api';
export async function POST(request: Request){
  const body = await request.json().catch(()=>({}));
  const subtotal = Number(body.subtotal || 0);
  const vatRate = Number(body.vatRate || 0.20);
  const vat = subtotal * vatRate;
  return json({ subtotal, vatRate, vat, total: subtotal + vat });
}
