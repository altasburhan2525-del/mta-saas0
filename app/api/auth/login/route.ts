import { demoUsers } from '@/lib/mockDb';

export async function POST(request: Request) {
  const form = await request.formData();
  const email = String(form.get('email') || '');
  const password = String(form.get('password') || '');
  const user = demoUsers.find(u => u.email === email && u.password === password);
  if (!user) return Response.redirect(new URL('/login?error=1', request.url), 303);
  return Response.redirect(new URL('/dashboard', request.url), 303);
}
