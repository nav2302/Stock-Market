import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';


@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(public loaderService: LoaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.loaderService.show();

    return next
      .handle(req)
      .pipe(
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.loaderService.hide();
          }
        }, (error) => {
          this.loaderService.hide();
        })
      );
  }
}
