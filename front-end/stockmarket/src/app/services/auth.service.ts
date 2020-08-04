import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Model/User';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registrationUrl = "http://localhost:8761/login-service/user/signup";
  private userLoginUrl = "http://localhost:8761/login-service/user/verify";
  private adminLoginUrl = "http://localhost:8761/login-service/admin/verify";

  constructor( @Inject(SESSION_STORAGE) private storage: StorageService, 
  private http: HttpClient) {}

  isAuthenticated(): boolean {
    if(typeof(this.getToken()) == 'undefined'){
      return false;
    }
    return true;
  }

  storeToken(token: string, auth_type: string) {
    this.storage.set("auth_token", token);
    this.storage.set("auth_type", auth_type);
  }

  getAuthType(): string {
    if (this.storage.get("auth_type") !== null) {
      return this.storage.get("auth_type");
    }
    return null;
  }


  getToken() {
    return this.storage.get("auth_token");
  }

  removeToken() {
    this.storage.remove("auth_type");
    return this.storage.remove("auth_token");
  }

  register(user: User): Observable<any> {
    return this.http.post(this.registrationUrl,
      JSON.stringify(user),
      {
        headers:
          { 'Content-Type': 'application/json' }
      });
  }

  userLogin(user: User): Observable<any> {
    return this.http.post(this.userLoginUrl,
      JSON.stringify(user),
      {
        headers:
          { 'Content-Type': 'application/json' }
      });
  }

  adminLogin(user: User): Observable<any> {
    return this.http.post(this.adminLoginUrl,
      JSON.stringify(user),
      {
        headers:
          { 'Content-Type': 'application/json' }
      });
  }


}
