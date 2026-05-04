import { json } from '@/lib/api';
export async function GET(){ return json({ source: 'manual-fallback', dieselTry: null, note: 'Canlı mazot servisi bağlanınca burası güncellenecek.' }); }
