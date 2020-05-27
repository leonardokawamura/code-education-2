import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponseBase, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap, flatMap } from 'rxjs/operators';
import { AuthProvider } from './auth';
import { App } from 'ionic-angular';
import { LoginOptionsPage } from '../../pages/login-options/login-options';
import { JwtInterceptor } from '@auth0/angular-jwt';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  private _jwtInterceptor: JwtInterceptor;

  constructor(private authService: AuthProvider, 
              private app: App,
              private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {     
    this.jwtInterceptor;
    if(!this.authService.getToken || !this.isTokenExpired() || req.url === this.authService.refreshUrl()) {      
      return this.handleRequest(req, next);
    } else {      
      return this.authService.refresh()
        .pipe(
          flatMap((data) => {
            const obs = this._jwtInterceptor.intercept(req, next);
            this.setPipes(obs);
            return obs;
          })
        );
    }
  }

  private isTokenExpired() {
    const token = this.authService.getToken();
    return this.authService.isTokenExpired(token);
  }

  private handleRequest(req: HttpRequest<any>, next: HttpHandler) {
    const obs = next.handle(req);
    this.setPipes(obs);
    return obs;
  }

  private setPipes(observable: Observable<any>) {
    observable.pipe(
      tap((event: HttpEvent<any>) => {
        console.log(event);
        this.setNewTokenIfResponseValid(event);
      }, (eventError: HttpEvent<any>) => {
        this.setNewTokenIfResponseValid(eventError);
        this.redirectToLoginIfUnaunthenticated(eventError);
      })
    );
  }

  private get jwtInterceptor(): JwtInterceptor {
    if(this._jwtInterceptor) {
      return this._jwtInterceptor;
    }
    const interceptors = this.injector.get(HTTP_INTERCEPTORS);
    const index = interceptors.findIndex((interceptor) => interceptor instanceof JwtInterceptor);
    this._jwtInterceptor = interceptors[index] as JwtInterceptor;
    return this._jwtInterceptor;
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
