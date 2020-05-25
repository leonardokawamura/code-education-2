import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
declare const cordova;
/**
 * Generated class for the FirebasePhoneNumberCheckComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'firebase-phone-number-check',
  templateUrl: 'firebase-phone-number-check.html'
})
export class FirebasePhoneNumberCheckComponent {

  countryCode = "55";
  verificationId = "";

  constructor(private platform: Platform) {
    
  }

  verifyPhoneNumber() {
    this.platform.ready().then(() => {
      cordova.plugins.firebase.auth.verifyPhoneNumber('+16505551234', 30000)
        .then((verificationId) => {
          console.log(verificationId)
        }, (error) => console.log(error)); 
    });
  }

  cancel() {
    this.verificationId = '';
  }

}
