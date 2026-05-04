export const roles = ['super_admin', 'dealer_admin', 'staff', 'customer'] as const;

export const demoUsers = [
  { id: 1, name: 'MT Altaş Admin', email: 'admin@mta.local', password: 'demo123', role: 'super_admin', dealerId: null },
  { id: 2, name: 'Demo Bayi', email: 'bayi@mta.local', password: 'demo123', role: 'dealer_admin', dealerId: 1 }
];

export const demoDealers = [
  { id: 1, name: 'Demo Bayi İnşaat', status: 'active', city: 'Adıyaman', phone: '+90 555 000 00 00' }
];

export const demoProposals = [
  { id: 'demo', dealerId: 1, customerName: 'Demo Müşteri', total: 125000, status: 'draft', currency: 'TRY' }
];
