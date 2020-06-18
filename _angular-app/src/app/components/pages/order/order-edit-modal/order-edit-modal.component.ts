import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { OrderStatus, Order } from '../../../../model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderHttpService } from '../../../../services/http/order-http.service';

@Component({
  selector: 'order-edit-modal',
  templateUrl: './order-edit-modal.component.html',
  styleUrls: ['./order-edit-modal.component.css']
})
export class OrderEditModalComponent implements OnInit {

  STATUS_ENUM = OrderStatus;
  _orderId: number;
  order: Order;
  form: FormGroup;
  errors = {};

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  @ViewChild(ModalComponent, {static: false}) modal: ModalComponent;
  
  constructor(private orderHttp: OrderHttpService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({   
      payment_link: '',
      obs: ''
    });
  }

  ngOnInit() {}

  submit(status: OrderStatus = null) {
    const isPaymentLinkDisabled = this.form.get('payment_link').disabled;
    this.orderHttp
      .update(this._orderId, {
        status: status,
        obs: this.form.get('obs').value,
        payment_link: isPaymentLinkDisabled ? null : this.form.get('payment_link').value
      })
      .subscribe(
        order => {
          this.onSuccess.emit(order);
          this.modal.hide();
        },
        responseError => {
          if (responseError.status === 422) {
            this.errors = responseError.error.errors;
          }
          this.onError.emit(responseError);
        }
      );
    return false;
  }

  showModal(orderId) {
    this._orderId = orderId;
    this.getOrder();
    this.modal.show();
  }

  getOrder() {
    this.orderHttp.get(this._orderId).subscribe(
      order => {
        this.order = order;
        this.form.patchValue(order);
        if (order.status !== OrderStatus.STATUS_PENDING) {
          this.form.get('payment_link').disable();
        }
      },
      responseError => {
        if (responseError.status == 401) {
          this.modal.hide();
        }
      }
    );
  }

  hideModal($event) {
    this.modal.hide();
    this.reset();
    this.errors = {};
  }

  reset() {
    this.form.reset({
      obs: '',
      payment_link: { value: '', disabled: false }
    });
    this.order = null;
  }

  showErrors() {
    return Object.keys(this.errors).length !== 0;
  }

}
