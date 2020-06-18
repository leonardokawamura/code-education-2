import { Component, OnInit } from '@angular/core';
import { Order } from '../../app/model';
import { InfiniteScroll, Refresher, ToastController, Toast, App } from 'ionic-angular';
import { OrderHttpProvider } from '../../providers/http/order-http';

@Component({
  selector: 'order-list',
  templateUrl: 'order-list.html'
})
export class OrderListComponent {

  orders: {data: Order[]} = {
    data: []
  };
  page = 1;
  canMoreOrder = true;
  toastLoading: Toast;

  constructor(private orderHttp: OrderHttpProvider,
              private toastCtrl: ToastController,
              private app: App) {}

  getOrders() {
    return this.orderHttp.list(this.page);
  }            

  ionViewDidLoad() {    
    this.getOrders().subscribe(
      orders => {
        this.orders = orders;
      },
      responseError => {
        console.log(responseError);
      }
    );
  }

  doRefresh(refresher: Refresher) {
    this.reset();
    this.getOrders().subscribe(
      orders => {
        this.orders = orders;
        refresher.complete();
      },
      error => {
        refresher.complete();
      }  
    );
  }

  reset() {
    this.page = 1;
    this.canMoreOrder = true;
  }

  doInfinite(infiniteScroll: InfiniteScroll) {
    this.page++;
    this.getOrders().subscribe(
      orders => {
        this.orders.data = this.orders.data.concat(orders.data);
        if(orders.data.length == 0) {
          this.canMoreOrder = false;
        }
        infiniteScroll.complete();
      },
      error => {
        infiniteScroll.complete();
      }  
    );
  } 

}
