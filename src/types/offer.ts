export type LangCode='tr'|'en'|'de'|'fr'|'ru'|'ar';
export type CalcInput={area:number;unitPrice:number;laborPrice:number;shipping:number;vatRate:number};
export type CalcResult={subtotal:number;vat:number;total:number};
