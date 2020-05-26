import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { AuthProvider } from './auth';
import { App } from 'ionic-angular';
import { LoginOptionsPage } from '../../pages/login-options/login-options';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthProvider, private app: App) { }

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
      this.app.getRootNav().setRoot(LoginOptionsPage);
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
