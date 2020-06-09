import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MainPage } from '../pages/main/main';
import { ChatMessagesPage } from '../pages/chat-messages/chat_messages/chat-messages';
import { LoginPhoneNumberPage } from '../pages/login-phone-number/login-phone-number';
import { LoginOptionsPage } from '../pages/login-options/login-options';
import { FirebaseMessaging } from '@ionic-native/firebase-messaging';
import { FirebaseDynamicLinks } from '@ionic-native/firebase-dynamic-links';
 
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginOptionsPage; 

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen, 
              private fcm: FirebaseMessaging,
              private fbDynamiclinks: FirebaseDynamicLinks) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.fcm.getToken().then((token) => {
        console.log(token);
      });
      this.fbDynamiclinks.onDynamicLink()
        .subscribe(res => {
            console.log(res);
          }
        );
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
