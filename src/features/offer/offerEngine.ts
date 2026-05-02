export type OfferLine = {
  id: string;
  category: string;
  name: string;
  unit: string;
  quantity: number;
  unitPrice: number;
};

export type OfferTotals = {
  subtotal: number;
  vat: number;
  total: number;
};

export function calculateLineTotal(line: OfferLine) {
  return Math.max(0, line.quantity) * Math.max(0, line.unitPrice);
}

export function calculateOfferTotals(lines: OfferLine[], vatRate = 0.2): OfferTotals {
  const subtotal = lines.reduce((sum, line) => sum + calculateLineTotal(line), 0);
  const vat = subtotal * vatRate;
  return { subtotal, vat, total: subtotal + vat };
}

export function formatMoney(value: number, locale = 'tr-TR') {
  return new Intl.NumberFormat(locale, { style: 'currency', currency: 'TRY' }).format(value || 0);
}
