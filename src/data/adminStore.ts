export type AdminProduct = {
  id: string;
  name: string;
  unit: string;
  price: number;
  category: string;
  active: boolean;
};

export type AdminSettings = {
  vatRate: number;
  laborPrice: number;
  shippingPrice: number;
  currency: 'TRY';
  updatedAt: string;
};

export const defaultProducts: AdminProduct[] = [
  { id: 'mta-mantolama', name: 'Mantolama Uygulaması', unit: 'm²', price: 350, category: 'Cephe', active: true },
  { id: 'mta-iscilik', name: 'Uygulama İşçilik', unit: 'İşçilik', price: 5000, category: 'Hizmet', active: true },
  { id: 'mta-nakliye', name: 'Nakliye', unit: 'Sefer', price: 3500, category: 'Lojistik', active: true },
];

export const defaultSettings: AdminSettings = {
  vatRate: 20,
  laborPrice: 5000,
  shippingPrice: 3500,
  currency: 'TRY',
  updatedAt: new Date().toISOString(),
};
