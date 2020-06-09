import { Injectable } from '@angular/core';
import { FirebaseMessaging } from '@ionic-native/firebase-messaging';
import { Platform } from 'ionic-angular';
import { UserProfileHttp } from '../http/user-profile-http';
import { merge } from 'rxjs/observable/merge';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

enum NotificationType {
  CHAT_GROUP_SUBSCRIBE = '1',
  NEW_MESSAGE = '2'
};

/*
  Generated class for the PushNotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class PushNotificationProvider {

  private notification = merge<{background: boolean, data: any}>(
    this.fcm.onBackgroundMessage().pipe(map(data => ({background: true, data}))),
    this.fcm.onMessage().pipe(map(data => ({background: false, data})))
  ).pipe(shareReplay());

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

  onChatGroupSubscribe(): Observable<{background: boolean, data: any}> {
    return Observable.create(observer => {
      this.notification.subscribe(data => {
        if(data.data.type === NotificationType.CHAT_GROUP_SUBSCRIBE) {
          observer.next(data);
        }
      })
    });
  }

  onNewMesaage(): Observable<{background: boolean, data: any}> {
    return Observable.create(observer => {
      this.notification.subscribe(data => {
        if(data.data.type === NotificationType.NEW_MESSAGE) {
          observer.next(data);
        }
      })
    });
  }

}
