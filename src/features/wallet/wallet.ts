import { createPublicClient, http, isAddress } from 'viem';
import { mainnet } from 'viem/chains';
import { CHAIN_ID, CONTRACT } from '../collection/metadata';
const ink = { ...mainnet, id: CHAIN_ID, name: 'Ink', nativeCurrency: { name:'Ether',symbol:'ETH',decimals:18 }, rpcUrls: { default: { http:['https://rpc-gel.inkonchain.com'] } }, blockExplorers: { default:{name:'Ink Explorer',url:'https://explorer.inkonchain.com'} } } as const;
export function validAddress(value:string){return isAddress(value.trim());}
export async function readChainId():Promise<number|null>{
  const eth = (window as Window & {ethereum?:{request:(a:{method:string})=>Promise<unknown>}}).ethereum;
  if(!eth) throw new Error('No compatible browser wallet was found. You can still analyze a public address.');
  const chain = await eth.request({method:'eth_chainId'});
  return typeof chain==='string' ? Number.parseInt(chain,16) : null;
}
export async function connectWallet():Promise<string>{
  const eth = (window as Window & {ethereum?:{request:(a:{method:string})=>Promise<unknown>}}).ethereum;
  if(!eth) throw new Error('Install or unlock a compatible wallet, or use public address lookup.');
  const accounts = await eth.request({method:'eth_requestAccounts'});
  if(!Array.isArray(accounts)||typeof accounts[0]!=='string') throw new Error('Wallet did not return an account.');
  return accounts[0];
}
export async function getOwnedTokenIds(address:string):Promise<string[]> {
  if(!validAddress(address)) throw new Error('Enter a valid EVM wallet address.');
  // Blockscout API v2 is used for indexed NFT holdings. Follow pagination when supplied.
  const base=`https://explorer.inkonchain.com/api/v2/addresses/${address}/nft?type=ERC-721`;
  const ids:string[]=[];
  let nextUrl:string|undefined=base;
  let pages=0;
  while(nextUrl && pages<40){
    const res=await fetch(nextUrl,{headers:{accept:'application/json'}});
    if(!res.ok) throw new Error(`Ink explorer NFT lookup failed (HTTP ${res.status}). You can retry or continue browsing the bundled metadata.`);
    const payload=await res.json() as {items?:Array<{token?:{address_hash?:string;name?:string};id?:string;token_id?:string}>; next_page_params?:Record<string,string|number|null> | null};
    for(const item of payload.items||[]){
      const contract=item.token?.address_hash;
      if(contract?.toLowerCase()===CONTRACT.toLowerCase()){
        let id=String(item.token_id ?? item.id ?? '');
        if(/^0x[0-9a-f]+$/i.test(id)){try{id=BigInt(id).toString(10)}catch{}}
        ids.push(id);
      }
    }
    const params=payload.next_page_params;
    if(!params || !Object.keys(params).length){nextUrl=undefined;break;}
    const url=new URL(base);
    Object.entries(params).forEach(([key,value])=>{if(value!==null&&value!==undefined)url.searchParams.set(key,String(value));});
    nextUrl=url.toString(); pages++;
  }
  if(pages>=40) throw new Error('Explorer returned many pages; lookup stopped at the safety limit. Narrow the lookup or verify the complete list in the explorer.');
  return [...new Set(ids.filter(Boolean))];
}

export async function checkInkChain(){
 const id=await readChainId(); if(id!==CHAIN_ID) throw new Error(`Wrong network. Switch your wallet to Ink Mainnet (chain ID ${CHAIN_ID}).`); return id;
}
