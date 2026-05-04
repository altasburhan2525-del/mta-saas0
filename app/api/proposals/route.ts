import { json } from '@/lib/api';
import { demoProposals } from '@/lib/mockDb';
export async function GET(){ return json(demoProposals); }
export async function POST(request: Request){ const body = await request.json().catch(()=>({})); return json({ id: 'new-demo', ...body }, 201); }
