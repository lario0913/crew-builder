export type Pirate = { tokenId:string; name:string; image:string|null; description:string; metadataUrl:string|null; openseaUrl:string|null; traits:Record<string,unknown>; role:string|null; legendary:boolean };
export type CrewMember = { tokenId:string; plannedRole:string|null };
export type CrewPlan = { id:string; name:string; shipName:string; shipMode:'custom'|'unverified'; members:CrewMember[]; notes:string; updatedAt:string; wallet:string|null };
export type PageKey = 'overview'|'pirates'|'gamecenter'|'builder'|'compare'|'gaps'|'ships'|'voyages'|'saved';
