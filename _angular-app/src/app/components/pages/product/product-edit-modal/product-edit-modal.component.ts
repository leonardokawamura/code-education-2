import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductHttpService } from 'src/app/services/http/product-http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import fieldsOptions from '../../product/product-form/product-fields-options';
import { ProductFormComponent } from '../product-form/product-form.component';

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
  @ViewChild(ProductFormComponent, {static: false}) productForm: ProductFormComponent;

  constructor(private productHttp: ProductHttpService, private formBuilder: FormBuilder) {
    const maxLengthName = fieldsOptions.name.validationMessage.maxlength;
    const maxLengthPrice = fieldsOptions.price.validationMessage.maxlength;
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(maxLengthName)]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.maxLength(maxLengthPrice)]],
      active: true,
      photo: null,
      photo_url: null
    });
  }

  ngOnInit() {}

  submit() {
    this.productHttp
      .update(this._productId, this.form.value)
      .subscribe(
        product => {            
          this.onSuccess.emit(product);      
          this.modal.hide(); 
        }, 
        responseError => {
          if(responseError.status === 422) {
            this.errors = responseError.error.errors;
          } else {
            this.onError.emit(responseError);
          }          
        }
      );
  }

  showModal(productId: number) {
    this._productId = productId;
    this.getProduct();
    this.modal.show();
    this.productForm.ngOnInit();
  }

  getProduct() {
    this.productHttp
      .get(this._productId)   
      .subscribe(
        product => {
          this.form.patchValue(product);
          this.form.get('photo').setValue(null);
        }, 
        error => {
          if(error.status == 401) {
            this.modal.hide();
          }
        }
      );
  }

  showErrors() {
    return Object.keys(this.errors).length != 0;
  }

  hideModal($event: Event) {
    this.form.reset();    
    this.errors = {};
  }

}
