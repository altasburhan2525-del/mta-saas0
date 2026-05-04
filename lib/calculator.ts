export type CalculatorInput = {
  areaM2: number;
  unitPrice: number;
  laborPrice?: number;
  transportPrice?: number;
  vatRate?: number;
};

export type CalculatorResult = {
  subtotal: number;
  vat: number;
  total: number;
  currency: 'TRY';
};

export function calculateOffer(input: CalculatorInput): CalculatorResult {
  const areaM2 = safeNumber(input.areaM2);
  const unitPrice = safeNumber(input.unitPrice);
  const laborPrice = safeNumber(input.laborPrice || 0);
  const transportPrice = safeNumber(input.transportPrice || 0);
  const vatRate = typeof input.vatRate === 'number' ? input.vatRate : 0.20;
  const subtotal = areaM2 * unitPrice + laborPrice + transportPrice;
  const vat = subtotal * vatRate;
  return {
    subtotal: roundMoney(subtotal),
    vat: roundMoney(vat),
    total: roundMoney(subtotal + vat),
    currency: 'TRY'
  };
}

export function roundMoney(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function safeNumber(value: unknown): number {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

export function formatTry(value: number): string {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(value);
}
