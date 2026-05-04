import { json } from '@/lib/api';
export async function GET(){ return json({ appName: 'MT Altaş SaaS', vatRate: 0.20, languages: ['tr','en','de','fr','ru','ar'] }); }
