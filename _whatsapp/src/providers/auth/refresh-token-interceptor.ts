import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap, flatMap } from 'rxjs/operators';
import { AuthProvider } from './auth';
import { App } from 'ionic-angular';
import { LoginOptionsPage } from '../../pages/login-options/login-options';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthProvider, private app: App) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(!this.authService.getToken || !this.isTokenExpired() || req.url === this.authService.refreshUrl()) {
      return this.handleRequest(req, next);
    } else {
      this.authService.refresh()
        .pipe(
          flatMap((data) => {
            return this.handleRequest(req, next);
          })
        );
    }
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

  private isTokenExpired() {
    const token = this.authService.getToken();
    return this.authService.isTokenExpired(token);
  }

  private handleRequest(req: HttpRequest<any>, next: HttpHandler) {
    const obs = next.handle(req);
    return obs;
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
