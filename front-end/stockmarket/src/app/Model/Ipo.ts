export interface Ipo {
    id: number,
    companyName: string,
    stockExchange: string,
    price?: string,
    totalShares?: string,
    createDate?: Date,
    modifyDate?: Date,
    remarks?: string
  }