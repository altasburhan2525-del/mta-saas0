export async function GET(){
  return Response.json({
    brand: 'MT Altaş Hesaplayıcı',
    vat: 0.20,
    currency: 'TRY'
  });
}
