import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .pipe(
        tap((event: HttpEvent<any>) => {
          this.setNewTokenIfResponseValid(event);
        }, (eventError: HttpEvent<any>) => {
          this.setNewTokenIfResponseValid(eventError);
          this.redirectToLoginIfUnaunthenticated(eventError);
        })
      )
  }

  private redirectToLoginIfUnaunthenticated(eventError: HttpEvent<any>) {
    if(eventError instanceof HttpErrorResponse && eventError.status == 401) {
      this.authService.setToken(null);
      this.router.navigate(['login']);
    }
  }

  private setNewTokenIfResponseValid(event: HttpEvent<any>) {
    if(event instanceof HttpResponseBase) {
      const authorizathionHeader = event.headers.get('authorization');
      if(authorizathionHeader) {
        const token = authorizathionHeader.split(' ')[1];
        this.authService.setToken(token);
      }    
    }
  }
}
