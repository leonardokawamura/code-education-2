import { Component, OnInit, Input } from '@angular/core';
import { OrderStatus } from '../../../../model';

@Component({
  selector: 'order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent implements OnInit {

  STATUS_ENUM = OrderStatus;

  @Input() status: OrderStatus;

  constructor() { }

  ngOnInit() {
  }

}
