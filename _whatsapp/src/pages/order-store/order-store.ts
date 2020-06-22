import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Product } from '../../app/model';
import { OrderHttpProvider } from '../../providers/http/order-http';

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
              private viewCtrl: ViewController) {
    this.product = this.navParams.get('product');
    console.log(this.product);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderStorePage');
  }

  submit() {
    
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
