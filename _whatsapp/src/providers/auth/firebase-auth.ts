import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import firebaseConfig from '../../app/firebase-config';
import firebaseui from 'firebaseui';
import scriptjs from 'scriptjs';

declare const firebaseui;
(<any>window).firebase = firebase;

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseAuthProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AuthProvider Provider');
  }

  private getFirebaseUI(): Promise<any> {
    return new Promise((resolve, reject) => {
      scriptjs('https://www.gstatic.com/firebasejs/ui/3.1.1/firebase-ui-auth__pt.js', () => {
        resolve(firebaseui);
      });
    });
    /* firebase.initializeApp(firebaseConfig);
    const uiConfig = {
      signInOptions: [
        firebase.auth.PhoneAuthProvider.PROVIDER_ID
      ]
    }
    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebase-ui', uiConfig); */
  }
}
