import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { Product } from '../../app/model';
import { OrderHttpProvider } from '../../providers/http/order-http';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * Generated class for the OrderStorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-store',
  templateUrl: 'order-store.html',
})
export class OrderStorePage {

  product: Product;
  amount = 1;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private ordertHttp: OrderHttpProvider,
              private viewCtrl: ViewController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController) {
    this.product = this.navParams.get('product');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderStorePage');
  }

  submit() {
    const loader = this.loadingCtrl.create({
      content: 'Carregando...'
    });
    this.ordertHttp
      .create({
        product_id: this.product.id,
        amount: this.amount
      })
      .subscribe(
        order => {
          loader.dismiss();
          const toast = this.toastCtrl.create({
            message: 'Pedido realizado com sucesso',
            duration: 7000
          });
          toast.present();
          setTimeout(() => {
            this.viewCtrl.dismiss(order);            
          }, 2000);
        },
        (resonseError: HttpErrorResponse) => {
          loader.dismiss();
          const toast = this.toastCtrl.create({
            message: 'Houve um problema no envio do pedido, tente novamente ou tente mais tarde',
            duration: 7000,
            cssClass: "toast-danger"
          });
          toast.present();
        }
      );
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
