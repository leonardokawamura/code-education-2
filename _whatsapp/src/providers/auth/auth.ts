import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseAuthProvider } from './firebase-auth.ts';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { map } from 'rxjs/operators';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public http: HttpClient, private firebaseAuth: FirebaseAuthProvider) {
    console.log('Hello AuthProvider Provider');
  }

  login(): Observable<{token: string}> {
    return fromPromise(this.firebaseAuth.getToken())
      .pipe(
        map(token => {
          return this.http.post<{token: string}>('http://dev.code-education.com.br/api/login_vendor', {token});
        })
      );
  }

}