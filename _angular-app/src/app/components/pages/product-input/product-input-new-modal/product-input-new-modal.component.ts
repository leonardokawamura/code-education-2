import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductInputHttpService } from 'src/app/services/http/product-input-http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import fieldsOptions from '../product-input-form/product-input-fields-options';

@Component({
  selector: 'product-input-new-modal',
  templateUrl: './product-input-new-modal.component.html',
  styleUrls: ['./product-input-new-modal.component.css']
})
export class ProductInputNewModalComponent implements OnInit {
 
  errors = {};
  form: FormGroup;

  @ViewChild(ModalComponent, {static: false}) modal: ModalComponent;
  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private inputHttp: ProductInputHttpService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      product_id: ['', [Validators.required]],
      amount: [null, [Validators.required, Validators.min(fieldsOptions.amount.validationMessage.min)]]
    });
  }

  ngOnInit() {

  }

  submit() {
    this.inputHttp
      .create(this.form.value)
      .subscribe((input) => {  
        this.onSuccess.emit(input);      
        this.modal.hide(); 
        this.form.reset({
          amount: '',
          product_id: null
        });   
      }, responseError => {
        if(responseError.status === 422) {
          this.errors = responseError.error.errors;
        }
        this.onError.emit(responseError)
      });
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
