import { Component, OnInit } from '@angular/core';
import { Order, OrderStatus } from '../../app/model';
import { InfiniteScroll, Refresher, Toast, NavParams } from 'ionic-angular';
import { OrderHttpProvider } from '../../providers/http/order-http';
import { OrderDetailPage } from '../../pages/order-detail/order-detail';
import { OrderSubjectProvider } from '../../providers/order-subject/order-subject';

@Component({
  selector: 'order-list',
  templateUrl: 'order-list.html'
})
export class OrderListComponent implements OnInit {

  STATUS_ENUM: OrderStatus;
  orders: {data: Order[]} = {
    data: []
  };
  page = 1;
  canMoreOrder = true;
  toastLoading: Toast;
  reload = false;
  showNoOrders = true;

  constructor(private orderHttp: OrderHttpProvider, 
              private navParams: NavParams, 
              private orderSubject: OrderSubjectProvider) {}

  getOrders() {
    return this.orderHttp.list(this.page);
  }       

  ngOnInit() {
    this.getOrders().subscribe(
      orders => {
        this.orders = orders;        
        if (orders.data.length <= 0) {
          this.showNoOrders = false;
        }
      },
      responseError => {
        console.log(responseError);
      }
    );    
  }

  ionViewWillEnter() {
    this.orderSubject.orderCancelled.subscribe(() => {
      this.orderHttp.list(this.page).subscribe(
        orders => {
          this.orders = orders;
        },
        responseError => {
          console.log(responseError);
        }
      ); 
    });
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
