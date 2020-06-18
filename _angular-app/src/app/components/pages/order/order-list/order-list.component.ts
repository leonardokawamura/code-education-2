import { Component, OnInit, ViewChild } from '@angular/core';
import { Order } from '../../../../model';
import { OrderHttpService } from '../../../../services/http/order-http.service';
import { OrderEditModalComponent } from '../order-edit-modal/order-edit-modal.component';
import { OrderEditService } from './order-edit.service';

@Component({
  selector: 'order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: Array<Order> = [];

  pagination = {
    page: 1,
    totalItems: 0,
    itemsPerPage: 15
  }

  sortColumn = {column: 'created_at', sort: 'desc'};
  searchText: string = '';

  @ViewChild(OrderEditModalComponent, {static: false}) orderEditModal: OrderEditModalComponent;

  constructor(private orderHttp: OrderHttpService, protected orderEditService: OrderEditService) { 
    this.orderEditService.orderListComponent = this;
  }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.orderHttp.list({
        page: this.pagination.page,
        sort: this.sortColumn.column === '' ? null : this.sortColumn,
        search: this.searchText === '' ? null : this.searchText      
      })
      .subscribe(response => {        
        this.orders = response.data;
        this.pagination.totalItems = response.meta.total;
        this.pagination.itemsPerPage = response.meta.per_page;
      });
  }

  pageChanged(page: number) {
    this.pagination.page = page;
    this.getOrders();
  }

  sort() {
    this.getOrders();
  }

  search(search: string) {
    this.searchText = search;
    this.getOrders();
  }

}
