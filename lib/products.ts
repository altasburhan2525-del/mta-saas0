export type ProductUnit = 'm²' | 'm³' | 'mt' | 'adet' | 'ton' | 'kg' | 'işçilik';

export type Product = {
  id: string;
  name: string;
  category: string;
  unit: ProductUnit;
  price: number;
  active: boolean;
};

export const defaultProducts: Product[] = [
  { id: 'kilit-tasi-6cm', name: 'Kilit Taşı 6 cm', category: 'Zemin Kaplama', unit: 'm²', price: 750, active: true },
  { id: 'bordur-50cm', name: 'Bordür 50 cm', category: 'Bordür', unit: 'mt', price: 180, active: true },
  { id: 'beton-c25', name: 'Hazır Beton C25', category: 'Beton', unit: 'm³', price: 2600, active: true },
  { id: 'nakliye', name: 'Nakliye Hizmeti', category: 'Hizmet', unit: 'adet', price: 2500, active: true },
  { id: 'iscilik', name: 'Uygulama İşçilik', category: 'Hizmet', unit: 'işçilik', price: 0, active: true }
];

export function getActiveProducts(){
  return defaultProducts.filter(product => product.active);
}
