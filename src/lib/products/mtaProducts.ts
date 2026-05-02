export type MtaProduct = {
  id: string;
  category: string;
  name: string;
  unit: 'm²' | 'mt' | 'adet' | 'm³' | 'kg' | 'ton' | 'gün' | 'işçilik';
  unitPrice: number;
  densityKgM2?: number;
  palletM2?: number;
  colors: string[];
  stockLabel: string;
  description: string;
};

export type MtaOfferLine = {
  id: string;
  productId: string;
  quantity: number;
};

export const MTA_PRODUCTS: MtaProduct[] = [
  { id: 'kilit-tasi-6cm', category: 'Zemin Kaplama', name: 'Kilit Taşı 6 cm', unit: 'm²', unitPrice: 350, densityKgM2: 135, palletM2: 10, colors: ['Gri', 'Kırmızı', 'Siyah', 'Mineralli'], stockLabel: 'Stokta hazır: 5.000 m²', description: 'Yaya yolları, bahçe, site içi ve hafif araç trafiği için uygundur.' },
  { id: 'kilit-tasi-8cm', category: 'Zemin Kaplama', name: 'Kilit Taşı 8 cm', unit: 'm²', unitPrice: 430, densityKgM2: 175, palletM2: 8, colors: ['Gri', 'Kırmızı', 'Siyah'], stockLabel: 'Üretim planına göre hazırlanır', description: 'Araç trafiği, otopark ve ağır kullanım alanları için önerilir.' },
  { id: 'karo-40x40', category: 'Zemin Kaplama', name: 'Beton Karo 40x40', unit: 'm²', unitPrice: 390, densityKgM2: 95, palletM2: 12, colors: ['Gri', 'Beyaz', 'Mineralli'], stockLabel: 'Stokta hazır: 2.000 m²', description: 'Villa bahçesi, yürüyüş yolu ve dekoratif zeminler için uygundur.' },
  { id: 'bordur-70cm', category: 'Çevre Düzenleme', name: 'Bahçe Bordürü 70 cm', unit: 'adet', unitPrice: 95, colors: ['Gri', 'Kırmızı'], stockLabel: 'Stokta hazır', description: 'Peyzaj ve bahçe çevre uygulamalarında kullanılır.' },
  { id: 'beton-c25', category: 'Beton ve Şap', name: 'Hazır Beton C25', unit: 'm³', unitPrice: 2850, colors: ['Standart'], stockLabel: 'Santral durumuna göre', description: 'Temel, saha betonu ve taşıyıcı olmayan genel uygulamalar için.' },
  { id: 'sap-iscilik', category: 'Beton ve Şap', name: 'Şap İşçiliği', unit: 'm²', unitPrice: 120, colors: ['Standart'], stockLabel: 'Ekip planına göre', description: 'Zemin düzeltme ve yüzey hazırlığı işçilik kalemi.' },
  { id: 'demir-12', category: 'Demir ve Donatı', name: 'İnşaat Demiri Ø12', unit: 'kg', unitPrice: 32, colors: ['Standart'], stockLabel: 'Piyasa durumuna göre', description: 'Donatı ve betonarme uygulamalarında kullanılan ana malzeme.' },
  { id: 'kum', category: 'Agrega ve Dolgu', name: 'Kum', unit: 'ton', unitPrice: 650, colors: ['Standart'], stockLabel: 'Ocak durumuna göre', description: 'Alt temel, harç ve dolgu uygulamaları için.' },
  { id: 'cimento', category: 'Agrega ve Dolgu', name: 'Çimento', unit: 'adet', unitPrice: 210, colors: ['Standart'], stockLabel: 'Stok kontrol gerekir', description: 'Harç, beton ve tamirat uygulamaları için torbalı çimento.' },
  { id: 'nakliye-tir', category: 'Nakliye ve Lojistik', name: 'Tır Nakliye', unit: 'sefer' as any, unitPrice: 18000, colors: ['Standart'], stockLabel: 'Güzergâha göre', description: 'Uzun mesafe toplu sevkiyat nakliye kalemi.' },
  { id: 'usta-gunluk', category: 'İşçilik', name: 'Usta Günlük', unit: 'gün', unitPrice: 2500, colors: ['Standart'], stockLabel: 'Ekip uygunluğuna göre', description: 'Genel saha uygulama ve montaj işçiliği.' },
];

export function getProductById(id: string) { return MTA_PRODUCTS.find((product) => product.id === id) || MTA_PRODUCTS[0]; }
export function getProductCategories() { return Array.from(new Set(MTA_PRODUCTS.map((p) => p.category))); }
export function estimateProductLogistics(product: MtaProduct, quantity: number) { const palletCount = product.palletM2 ? Math.ceil(quantity / product.palletM2) : 0; const tonnage = product.densityKgM2 ? (quantity * product.densityKgM2) / 1000 : product.unit === 'ton' ? quantity : 0; return { palletCount, tonnage }; }
export function calculateOfferLines(lines: MtaOfferLine[]) { return lines.map((line) => { const product = getProductById(line.productId); const logistics = estimateProductLogistics(product, line.quantity); const lineTotal = product.unitPrice * line.quantity; return { ...line, product, logistics, lineTotal }; }); }
