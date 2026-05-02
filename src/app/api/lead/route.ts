import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  // Şimdilik sadece log (V3.1 DB bağlanacak)
  console.log('NEW LEAD:', body);

  return NextResponse.json({ ok: true });
}
