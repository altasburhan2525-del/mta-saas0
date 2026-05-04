import { createProposal } from '@/lib/proposals';
import { addProposal, listProposals } from '@/lib/store';

export async function GET(){
  return Response.json({ proposals: listProposals() });
}

export async function POST(req: Request){
  const body = await req.json();
  const proposal = createProposal(body);
  addProposal(proposal);
  return Response.json({ proposal });
}
