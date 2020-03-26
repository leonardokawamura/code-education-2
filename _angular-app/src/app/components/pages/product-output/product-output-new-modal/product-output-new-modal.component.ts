import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductOutputHttpService } from 'src/app/services/http/product-output-http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import fieldsOptions from '../product-output-form/product-output-fields-options';

@Component({
  selector: 'product-output-new-modal',
  templateUrl: './product-output-new-modal.component.html',
  styleUrls: ['./product-output-new-modal.component.css']
})
export class ProductOutputNewModalComponent implements OnInit {
 
  errors = {};
  form: FormGroup;

  @ViewChild(ModalComponent, {static: false}) modal: ModalComponent;
  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private outputHttp: ProductOutputHttpService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      product_id: ['', [Validators.required]],
      amount: [null, [Validators.required, Validators.min(fieldsOptions.amount.validationMessage.min)]]
    });
  }

  ngOnInit() {

  }

  submit() {
    this.outputHttp
      .create(this.form.value)
      .subscribe((output) => {  
        this.onSuccess.emit(output);      
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
