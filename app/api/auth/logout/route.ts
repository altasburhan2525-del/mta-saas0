export async function POST(request: Request) {
  return Response.redirect(new URL('/login', request.url), 303);
}
