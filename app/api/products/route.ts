import { getActiveProducts } from '@/lib/products';

export async function GET(){
  return Response.json({
    products: getActiveProducts()
  });
}
