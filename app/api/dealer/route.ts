import { getDealerBySlug } from '@/lib/dealers';

export async function GET(req: Request){
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug') || 'mt-altas';
  const dealer = getDealerBySlug(slug);

  return Response.json({ dealer });
}
