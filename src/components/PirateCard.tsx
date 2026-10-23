import { Crown, Anchor, UserRound } from 'lucide-react';
import type { Pirate } from '../types';
export function PirateCard({pirate,selected,onClick,compact=false}:{pirate:Pirate;selected?:boolean;onClick?:()=>void;compact?:boolean}){
 return <button className={`pirate-card ${selected?'selected':''} ${compact?'compact':''}`} onClick={onClick} type="button" title={`Token #${pirate.tokenId}`}>
  <div className="pirate-art">{pirate.image?<img src={pirate.image} loading="lazy" alt={pirate.name} onError={e=>{e.currentTarget.style.display='none';}}/>:<div className="image-fallback"><UserRound size={30}/></div>}{pirate.legendary&&<span className="legendary-ribbon"><Crown size={12}/> LEGENDARY</span>}</div>
  <div className="pirate-card-info"><strong>{pirate.name}</strong><span className="token-id">#{pirate.tokenId}</span><span className="role-line"><Anchor size={12}/>{pirate.role||'Role unspecified'}</span></div>
 </button>
}
