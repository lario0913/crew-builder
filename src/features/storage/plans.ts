import type { CrewPlan } from '../../types';
const KEY='ink-pirates-crew-assistant:plans:v1';
export function loadPlans():CrewPlan[]{try{return JSON.parse(localStorage.getItem(KEY)||'[]') as CrewPlan[]}catch{return []}}
export function savePlans(plans:CrewPlan[]){localStorage.setItem(KEY,JSON.stringify(plans))}
export function downloadText(filename:string,text:string,type='application/json'){
 const blob=new Blob([text],{type});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=filename;a.click();URL.revokeObjectURL(url);
}
