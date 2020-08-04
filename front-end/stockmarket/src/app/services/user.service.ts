import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { cCompany } from '../Model/Company';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userHomeUrl = "http://localhost:8761/exchange-service/exchange/getStockExchanges";
  private companyDetailsUrl = "http://localhost:8761/company-service/home/getCompanyDetails?id=";
  private ipoDetailsUrl = "http://localhost:8761/company-service/home/ipos?id=";
  // private companyStockDetailsUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=navdeep&apikey=LWAMT19N2CE9JAFE";
  private companyStockDetailsUrl = "http://localhost:8761/excel-service/data/excelData?id=";
  private allCompanies = "http://localhost:8761/company-service/home/getAllCompanies?name=";

  constructor( @Inject(SESSION_STORAGE) private storage: StorageService, 
  private http: HttpClient) { }

  getCompanies(auth: string): Observable<any>{
    const myheader = new HttpHeaders().set('AUTH_TOKEN', auth);
    return this.http.post<any>(this.userHomeUrl, null, { headers: myheader });
  }

  getCompanyDetails(auth : string, id: string): Observable<any>{
    const myheader = new HttpHeaders().set('AUTH_TOKEN', auth);
    return this.http.get<any>(this.companyDetailsUrl + id, { headers: myheader });
  }

  getIpoDetails(auth: string, id: number):Observable<any>{
    const myheader = new HttpHeaders().set('AUTH_TOKEN', auth);
    return this.http.get<any>(this.ipoDetailsUrl + id, {headers : myheader});
  }

  getIpoDetailsWithPaging(auth: string, id:number, page:number, size:number):Observable<any>{
    const myheader = new HttpHeaders().set('AUTH_TOKEN', auth);
    return this.http.get<any>(this.ipoDetailsUrl + id +'&page=' + page + '&size=' +size, {headers : myheader});
  }

  getCompanyStockDetails(id: number):Observable<any>{
    return this.http.get(this.companyStockDetailsUrl + id,
      {
        headers:
          { 'Content-Type': 'application/json' }
      }
      );
  }

  search(filter: {name: string} = {name: ''}, page = 1, stockName): Observable<any> {
    return this.http.get<any>(this.allCompanies+stockName)
    .pipe(
      tap((response: any) => {
        response.companies = response.companies
          .map(company => new cCompany(company.id, company.companyCode, company.name))
          .filter(company => company.name.toLowerCase().includes(filter.name))
        return response;
      })
      );
  }

}
