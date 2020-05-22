import { Component } from '@angular/core';

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

  constructor() {
    
  }

  verifyPhoneNumber() {
    this.verificationId = '111111';
  }

  cancel() {
    this.verificationId = '';
  }

}
