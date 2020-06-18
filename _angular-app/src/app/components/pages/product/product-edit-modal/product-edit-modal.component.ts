import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from 'src/app/model';
import { ProductHttpService } from 'src/app/services/http/product-http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import fieldsOptions from '../../product/product-form/product-fields-options';

@Component({
  selector: 'product-edit-modal',
  templateUrl: './product-edit-modal.component.html',
  styleUrls: ['./product-edit-modal.component.css']
})
export class ProductEditModalComponent implements OnInit {

  errors = {};

  form: FormGroup;

  _productId: number;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  @ViewChild(ModalComponent, {static: false}) modal: ModalComponent;  

  constructor(private productHttp: ProductHttpService, private formBuilder: FormBuilder) {
    const maxLengthName = fieldsOptions.name.validationMessage.maxlength;
    const maxLengthPrice = fieldsOptions.price.validationMessage.maxlength;
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(maxLengthName)]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.maxLength(maxLengthPrice)]],
      active: true
    });
  }

  ngOnInit() {}

  @Input()
  set productId(value) {
    this._productId = value;
    if (this._productId) {
      this.productHttp
        .get(this._productId)   
        .subscribe(
          product => {
            this.form.patchValue(product);
          }, 
          error => {
            if(error.status == 401) {
              this.modal.hide();
            }
          }
        )
    } 
  }

  submit() {
    this.productHttp
      .update(this._productId, this.form.value)
      .subscribe(
        product => {  
          this.onSuccess.emit(product);      
          this.modal.hide();   
        }, 
        error => {
          this.onError.emit(error)
        }
      );
  }

  showModal() {
    this.modal.show();
  }

  showErrors() {
    return Object.keys(this.errors).length != 0;
  }

  hideModal($event: Event) {
    
  }

}
