import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { Product } from 'src/app/model';
import { ProductHttpService } from 'src/app/services/http/product-http.service';

@Component({
  selector: 'product-new-modal',
  templateUrl: './product-new-modal.component.html',
  styleUrls: ['./product-new-modal.component.css']
})
export class ProductNewModalComponent implements OnInit {

  product: Product = {
    name: '',
    description: '',
    price: 0.00,
    active: true
  };

  @ViewChild(ModalComponent, {static: false})
  modal: ModalComponent;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private productHttp: ProductHttpService) { }

  ngOnInit() {

  }

  submit() {
    this.productHttp
      .create(this.product)
      .subscribe((product) => {  
        this.onSuccess.emit(product);      
        this.modal.hide();    
      }, error => this.onError.emit(error));
  }

  showModal() {
    this.modal.show();
  }

  hideModal($event: Event) {
    
  }
}