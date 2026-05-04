import { createProposal } from '@/lib/proposals';
import { addProposal, listProposals } from '@/lib/store';
import { getDatabaseMode } from '@/lib/supabase';

export async function GET(){
  if(getDatabaseMode() === 'memory'){
    return Response.json({ proposals: listProposals() });
  }

  return Response.json({ proposals: [], note:'Supabase aktif değil' });
}

export async function POST(req: Request){
  const body = await req.json();
  const proposal = createProposal(body);

  if(getDatabaseMode() === 'memory'){
    addProposal(proposal);
    return Response.json({ proposal, mode:'memory' });
  }

  return Response.json({ proposal, mode:'supabase-ready' });
}
