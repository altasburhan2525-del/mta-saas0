import { calculateOffer, type CalculatorInput } from './calculator';

export type ProposalStatus = 'draft' | 'sent' | 'approved' | 'rejected';

export type ProposalInput = CalculatorInput & {
  customerName: string;
  customerPhone?: string;
  projectName?: string;
  productName?: string;
  productUnit?: string;
  quantity?: number;
};

export type Proposal = {
  id: string;
  customerName: string;
  customerPhone: string;
  projectName: string;
  productName: string;
  productUnit: string;
  quantity: number;
  subtotal: number;
  vat: number;
  total: number;
  currency: 'TRY';
  status: ProposalStatus;
  createdAt: string;
};

export function createProposal(input: ProposalInput): Proposal {
  const result = calculateOffer(input);
  return {
    id: `MT-${Date.now()}`,
    customerName: input.customerName || 'Müşteri',
    customerPhone: input.customerPhone || '',
    projectName: input.projectName || 'Proje',
    productName: input.productName || 'Ürün / Hizmet',
    productUnit: input.productUnit || 'adet',
    quantity: Number(input.quantity || input.areaM2 || 0),
    subtotal: result.subtotal,
    vat: result.vat,
    total: result.total,
    currency: 'TRY',
    status: 'draft',
    createdAt: new Date().toISOString()
  };
}
