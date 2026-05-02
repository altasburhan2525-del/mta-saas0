import type { CalcInput, CalcResult } from '@/types/offer';
export function money(n:number, locale='tr-TR', currency='TRY'){return new Intl.NumberFormat(locale,{style:'currency',currency}).format(Number.isFinite(n)?n:0)}
export function calculateOffer(i:CalcInput):CalcResult{const subtotal=(i.area*i.unitPrice)+i.laborPrice+i.shipping; const vat=subtotal*i.vatRate; return {subtotal,vat,total:subtotal+vat}}
