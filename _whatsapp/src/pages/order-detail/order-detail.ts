import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Order, OrderStatus } from '../../app/model';
import { OrderHttpProvider } from '../../providers/http/order-http';
import { Clipboard } from '@ionic-native/clipboard';
import { OrderSubjectProvider } from '../../providers/order-subject/order-subject';

/**
 * Generated class for the OrderDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
})
export class OrderDetailPage {

  STATUS_ENUM = OrderStatus;
  order: Order;
  reloadOrders = false

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private orderHttp: OrderHttpProvider,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private clipboard: Clipboard,
              private orderSubject: OrderSubjectProvider) {
    this.order = this.navParams.get('order');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailPage');
  }

  ionViewWillLeave(){
    if (this.reloadOrders) {
      this.orderSubject.orderCancelled.next();
    }
  }

  cancel() {
    const loader = this.loadingCtrl.create({
      content: 'Carregando...'
    });
    loader.present();
    this.orderHttp.cancel(this.order.id)
      .subscribe(
        order => {
          this.order = order;
          const toast = this.toastCtrl.create({
            message: 'Pedido cancelado com sucesso',
            duration: 7000
          });
          toast.present();
          loader.dismiss();
          this.reloadOrders = true;
        },  
        () => loader.dismiss()    
      );
  }

  copy() {
    this.clipboard.copy(this.order.payment_link);
    const toast = this.toastCtrl.create({
      message: 'Link de pagamento copiado com sucesso',
      duration: 3000
    });
    toast.present();
  }
}
