import { Component } from '@angular/core';
import { Order } from '../../app/model';
import { InfiniteScroll, Refresher, Toast, NavParams } from 'ionic-angular';
import { OrderHttpProvider } from '../../providers/http/order-http';
import { OrderDetailPage } from '../../pages/order-detail/order-detail';

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
              private navParams: NavParams) {}

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

  openOrderDetail(order) {
    const navRoot = this.navParams.get('rootNavCtrl');
    navRoot.push(OrderDetailPage, {order})
  }

}
