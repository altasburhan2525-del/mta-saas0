export type Dealer = {
  id: string;
  slug: string;
  name: string;
  phone: string;
  themeColor: string;
  vatRate: number;
};

export const demoDealers: Dealer[] = [
  {
    id: 'dealer-demo',
    slug: 'mt-altas',
    name: 'MT Altaş İnşaat',
    phone: '905426174956',
    themeColor: '#d83939',
    vatRate: 0.20
  }
];

export function getDealerBySlug(slug: string){
  return demoDealers.find(dealer => dealer.slug === slug) || demoDealers[0];
}
