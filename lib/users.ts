export type UserRole = 'super_admin' | 'dealer_admin' | 'staff' | 'customer';

export type AppUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  dealerId?: string;
};

export const demoUsers: AppUser[] = [
  { id: 'usr-super-admin', name: 'MT Altaş Sistem Yöneticisi', email: 'admin@mtaltas.local', role: 'super_admin' },
  { id: 'usr-dealer-demo', name: 'Demo Bayi', email: 'bayi@mtaltas.local', role: 'dealer_admin', dealerId: 'dealer-demo' }
];

export function findUserByEmail(email: string){
  return demoUsers.find(user => user.email.toLowerCase() === email.toLowerCase());
}
