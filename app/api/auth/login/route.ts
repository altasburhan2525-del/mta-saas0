import { findUserByEmail } from '@/lib/users';

export async function POST(req: Request){
  const { email } = await req.json();
  const user = findUserByEmail(email || '');

  if(!user){
    return Response.json({ ok:false, message:'Kullanıcı bulunamadı' }, { status:401 });
  }

  return Response.json({ ok:true, user });
}
