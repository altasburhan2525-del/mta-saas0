export type MtaProduct = {
  id: string;
  category: string;
  name: string;
  unit: 'm²' | 'mt' | 'adet' | 'm³' | 'kg';
  unitPrice: number;
  densityKgM2?: number;
  palletM2?: number;
  colors: string[];
  stockLabel: string;
  description: string;
};

export const MTA_PRODUCTS: MtaProduct[] = [
  {
    id: 'kilit-tasi-6cm',
    category: 'Kilit Taşı',
    name: 'Kilit Taşı 6 cm',
    unit: 'm²',
    unitPrice: 350,
    densityKgM2: 135,
    palletM2: 10,
    colors: ['Gri', 'Kırmızı', 'Siyah', 'Mineralli'],
    stockLabel: 'Stokta hazır: 5.000 m²',
    description: 'Yaya yolları, bahçe, site içi ve hafif araç trafiği için uygundur.',
  },
  {
    id: 'kilit-tasi-8cm',
    category: 'Kilit Taşı',
    name: 'Kilit Taşı 8 cm',
    unit: 'm²',
    unitPrice: 430,
    densityKgM2: 175,
    palletM2: 8,
    colors: ['Gri', 'Kırmızı', 'Siyah'],
    stockLabel: 'Üretim planına göre hazırlanır',
    description: 'Araç trafiği, otopark ve ağır kullanım alanları için önerilir.',
  },
  {
    id: 'bordur-70cm',
    category: 'Bordür',
    name: 'Bahçe Bordürü 70 cm',
    unit: 'adet',
    unitPrice: 95,
    colors: ['Gri', 'Kırmızı'],
    stockLabel: 'Stokta hazır',
    description: 'Peyzaj ve bahçe çevre uygulamalarında kullanılır.',
  },
  {
    id: 'karo-40x40',
    category: 'Karo',
    name: 'Beton Karo 40x40',
    unit: 'm²',
    unitPrice: 390,
    densityKgM2: 95,
    palletM2: 12,
    colors: ['Gri', 'Beyaz', 'Mineralli'],
    stockLabel: 'Stokta hazır: 2.000 m²',
    description: 'Villa bahçesi, yürüyüş yolu ve dekoratif zeminler için uygundur.',
  },
];

export function getProductById(id: string) {
  return MTA_PRODUCTS.find((product) => product.id === id) || MTA_PRODUCTS[0];
}

export function estimateProductLogistics(product: MtaProduct, quantity: number) {
  const palletCount = product.palletM2 ? Math.ceil(quantity / product.palletM2) : 0;
  const tonnage = product.densityKgM2 ? (quantity * product.densityKgM2) / 1000 : 0;
  return { palletCount, tonnage };
}
