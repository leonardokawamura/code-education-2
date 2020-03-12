import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { User } from '../model';
import { JwtHelperService } from '@auth0/angular-jwt';

const TOKEN_KEY = 'code-education';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  me: User = null;

  constructor(private http: HttpClient) { 
    const token = this.getToken();
    this.setUserFromToken(token);
  }

  login(user: {email: string, password: string}): Observable<{token: string}> {
    return this.http
      .post<{token: string}>('http://dev.code-education.com.br/api/login', user)
      .pipe(
        tap(response => {
          this.setToken(response.token);
        })
      );     
  }

  setToken(token: string) {
    this.setUserFromToken(token);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  private setUserFromToken(token: string) {
    const decodedPayload = new JwtHelperService().decodeToken(token);
    this.me = decodedPayload ? {
      id: decodedPayload.sub,
      name: decodedPayload.name,
      email: decodedPayload.email
    } : null
  }

  getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }


}
