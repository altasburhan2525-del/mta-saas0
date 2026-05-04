import { createProposal } from '@/lib/proposals';

export async function POST(req: Request){
  const body = await req.json();
  const proposal = createProposal(body);
  return Response.json({ proposal });
}
