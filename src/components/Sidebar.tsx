import { Anchor, Home, Search, Compass } from 'lucide-react';
import type { PageKey } from '../types';
const items:{id:PageKey;label:string;icon:typeof Home;status?:string}[]=[
 {id:'overview',label:'Overview',icon:Home},
 {id:'pirates',label:'My Pirates',icon:Search},
 {id:'gamecenter',label:'Game Center',icon:Compass,status:'SOON'},
];
export function Sidebar({page,onNavigate}:{page:PageKey;onNavigate:(p:PageKey)=>void}){
 return <aside className="sidebar"><div className="brand"><div className="brand-mark"><Anchor size={25}/></div><div><div className="brand-title">INK PIRATES</div><small>CREW ASSISTANT</small></div></div><nav>{items.map(({id,label,icon:Icon,status})=><button key={id} onClick={()=>onNavigate(id)} className={page===id?'active':''}><Icon size={18}/><span>{label}</span>{status&&<i>{status}</i>}</button>)}</nav><div className="sidebar-bottom"><div className="network-dot"><span/> Ink Mainnet <b>57073</b></div><small>Collection tools active · Game features awaiting verified rules</small></div></aside>
}
