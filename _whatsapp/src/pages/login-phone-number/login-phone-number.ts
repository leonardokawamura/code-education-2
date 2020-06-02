import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { FirebaseAuthProvider } from '../../providers/auth/firebase-auth';
import { AuthProvider } from '../../providers/auth/auth';
import { MainPage } from '../main/main';
import { CustomerCreatePage } from '../customer-create/customer-create';
import { environment } from '@app/env';

/**
 * Generated class for the LoginPhoneNumberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-phone-number',
  templateUrl: 'login-phone-number.html',
})
export class LoginPhoneNumberPage {
  
  showFirebaseUI = environment.showFirebaseUI;
  loader: Loading;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private firebaseAuth: FirebaseAuthProvider,
              private authService: AuthProvider,
              private loadingCtrl: LoadingController) {}

  ionViewDidLoad() {   
    const unsubscribed = this.firebaseAuth.firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.loader = this.loadingCtrl.create({
          content: 'Carregando...'
        });
        this.loader.present();
        this.handleAuthUser();
        unsubscribed();
      }
    });  
    if(environment.showFirebaseUI) {
      this.firebaseAuth.makePhoneNumberForm('#firebase-ui');
    }         
  }

  handleAuthUser() {
    this.authService.login()
      .subscribe(
        response => {
          this.loader.dismiss();
          console.log('redirecionando para main page');
          this.redirectToMainPage();
        }, 
        responseError => {
          this.loader.dismiss();
          if(environment.showFirebaseUI) {
            this.firebaseAuth.makePhoneNumberForm('#firebase-ui')
              .then(() => this.handleAuthUser());
          }
          console.log('redirecionando para createPage');
          this.redirectToCustomerCreatePage();
        }
      ); 
  }

  redirectToMainPage() {
    this.navCtrl.setRoot(MainPage);
  }

  redirectToCustomerCreatePage() {
    this.navCtrl.push(CustomerCreatePage);
  }

}
