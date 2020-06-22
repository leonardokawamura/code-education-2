import { Component, Output, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Order, OrderStatus } from '../../app/model';
import { OrderHttpProvider } from '../../providers/http/order-http';

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

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private orderHttp: OrderHttpProvider,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController) {
    this.order = this.navParams.get('order');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailPage');
  }

  ionViewWillLeave(){
    // TENTAR FAZER A PÁGINA DOS PEDIDOS RECARREGAR AUTOMATICAMENTE DEPOIS DO PEDIDO CANCELADO
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
        },  
        () => loader.dismiss()    
      );
  }
}
