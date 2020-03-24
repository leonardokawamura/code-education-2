import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ProductInput, Product } from 'src/app/model';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductInputHttpService } from 'src/app/services/http/product-input-http.service';

@Component({
  selector: 'product-input-new-modal',
  templateUrl: './product-input-new-modal.component.html',
  styleUrls: ['./product-input-new-modal.component.css']
})
export class ProductInputNewModalComponent implements OnInit {
  
  input = {
    amount: 0,
    product_id: 0
  }

  @ViewChild(ModalComponent, {static: false})
  modal: ModalComponent;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private inputHttp: ProductInputHttpService) { }

  ngOnInit() {

  }

  submit() {
    this.inputHttp
      .create(this.input)
      .subscribe((input) => {  
        this.onSuccess.emit(input);      
        this.modal.hide();    
      }, error => this.onError.emit(error));
  }

  showModal() {
    this.modal.show();
  }

  hideModal($event: Event) {
    
  }

}
