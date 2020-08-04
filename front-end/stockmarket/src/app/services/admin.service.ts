import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Model/User';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { cCompany, Company } from '../Model/Company';
import { Ipo } from '../Model/Ipo';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private adminHomeUrl = "http://localhost:8761/company-service/home/adminHome";
  private editCompanyUrl = "http://localhost:8761/company-service/home/editCompany";
  private addCompanyUrl = "http://localhost:8761/company-service/home/addCompany";
  private updateCompanyUrl = "http://localhost:8761/company-service/home/actDeactCompany";
  private deleteCompanyUrl = "http://localhost:8761/company-service/home/deleteCompany?id=";
  private addIpoUrl = "http://localhost:8761/company-service/home/addIpo";
  private editIpoUrl = "http://localhost:8761/company-service/home/editIpo";
  private uploadExcelFileUrl = "http://localhost:8761/excel-service/data/uploadDataInExcel";

  public companyToEdit :Company;

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService, 
  private http: HttpClient) { }

  getAllStocksAndCompanies(auth: string): Observable<any>{
    const myheader = new HttpHeaders().set('AUTH_TOKEN', auth);
    return this.http.get<any>(this.adminHomeUrl, { headers: myheader });
  }

  updateCompany(company:Company):Observable<any>{
    return this.http.post<any>(this.updateCompanyUrl, JSON.stringify(company),
    {
      headers:
        { 'Content-Type': 'application/json' }
    });
  }

  addNewCompany(auth:string, company:Company, stockName: string): Observable<any>{
    const myHeader = new HttpHeaders().set('AUTH_TOKEN', auth).set('name', stockName)
    .set('Content-Type', 'application/json');
    return this.http.post<any>(this.addCompanyUrl,JSON.stringify(company), {headers: myHeader});
  }

  deleteCompany(id:number, stockName:string): Observable<any> {
    return this.http.get<any>(this.deleteCompanyUrl+id+'&name='+stockName);
  }

  editCompany(auth:string, company:Company, stockName: string): Observable<any>{
    const myHeader = new HttpHeaders().set('AUTH_TOKEN', auth).set('name', stockName)
    .set('Content-Type', 'application/json');
    return this.http.post<any>(this.editCompanyUrl,JSON.stringify(company), {headers: myHeader});
  }

  addIpo(auth:string, ipo: any): Observable<any>{
    const myHeader = new HttpHeaders().set('AUTH_TOKEN', auth).set('Content-Type', 'application/json');
    return this.http.post<any>(this.addIpoUrl,JSON.stringify(ipo), {headers: myHeader});
  }

  editIpo(auth:string, ipoId: number, ipo: any): Observable<any>{
    const myHeader = new HttpHeaders().set('AUTH_TOKEN', auth)
    .set('id', ipoId.toString())
    .set('Content-Type', 'application/json');
    return this.http.post<any>(this.editIpoUrl, JSON.stringify(ipo), {headers : myHeader});
  }

  uploadExcelData(file: File, companyId: number): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('id', companyId.toString());
    const req = new HttpRequest('POST', this.uploadExcelFileUrl, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  setCompanyToEdit(company){
    this.companyToEdit = company;
  }

  getCompanyToEdit(){
    return this.companyToEdit;
  }

}
