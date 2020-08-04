export interface Company {
    companyCode?: any;
    id: number,
    name: string,
    turnOver?: number,
    ceo?: string,
    boardOfDirector?: string,
    breif?: string,
    sectors?: [],
    active?:boolean
  }

export class cCompany{
  constructor(public id: number, public code: string, public name: string) {}
}