import type { Proposal } from './proposals';

// In-memory store (dev only). Replace with real DB later.
const proposals: Proposal[] = [];

export function addProposal(p: Proposal){
  proposals.unshift(p);
}

export function listProposals(){
  return proposals;
}
