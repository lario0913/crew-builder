import type { Pirate } from '../../types';
export const CONTRACT = '0x77ffb009c5d5914e870f6c4a4523dbb96b2f9def';
export const CHAIN_ID = 57073;
export const EXPLORER = `https://explorer.inkonchain.com/token/${CONTRACT}`;
export async function loadPirates(): Promise<Pirate[]> {
  const response = await fetch('/data/pirates.json');
  if (!response.ok) throw new Error('Could not load the bundled NFT metadata snapshot.');
  return response.json() as Promise<Pirate[]>;
}
export function roleCounts(pirates:Pirate[]) {
  return pirates.reduce<Record<string,number>>((acc,p)=>{const role=p.role || 'Unspecified';acc[role]=(acc[role]||0)+1;return acc;},{});
}
