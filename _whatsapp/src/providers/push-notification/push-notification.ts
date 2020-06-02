import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseMessaging } from '@ionic-native/firebase-messaging';
import { Platform } from 'ionic-angular';
import { UserProfileHttp } from '../http/user-profile-http';

/*
  Generated class for the PushNotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PushNotificationProvider {

  constructor(private fcm: FirebaseMessaging,
              private platform: Platform,
              private userProfileHttp: UserProfileHttp) {}

  registerToken() {
    if(this.platform.is('ios')) {
      this.fcm.requestPermission()
        .then(() => {
          this.saveToken();
        })
    }
    if(this.platform.is('android')) {
      this.saveToken();
    }
  }

  private saveToken() {
    this.fcm.getToken()
      .then((token) => {
        this.userProfileHttp.update({device_token: token})
          .subscribe(() => {console.log('token registrado')})
      })
  }

}
