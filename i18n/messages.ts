export const messages = {
  tr: { login: 'Giriş', dashboard: 'Panel', admin: 'Admin', dealer: 'Bayi Paneli' },
  en: { login: 'Login', dashboard: 'Dashboard', admin: 'Admin', dealer: 'Dealer Panel' },
  de: { login: 'Anmelden', dashboard: 'Dashboard', admin: 'Admin', dealer: 'Händlerbereich' },
  fr: { login: 'Connexion', dashboard: 'Tableau de bord', admin: 'Admin', dealer: 'Espace revendeur' },
  ru: { login: 'Вход', dashboard: 'Панель', admin: 'Админ', dealer: 'Панель дилера' },
  ar: { login: 'تسجيل الدخول', dashboard: 'لوحة التحكم', admin: 'المدير', dealer: 'لوحة الوكيل' }
};

export type Lang = keyof typeof messages;
