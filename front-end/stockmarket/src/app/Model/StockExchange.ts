import { Company } from './Company';

export interface StockExchange {
    id : number,
    name : string,
    brief : string,
    contactAddress:string,
    remarks:string,
    companies:Company[]
}