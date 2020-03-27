import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { ProductHttpService } from 'src/app/services/http/product-http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import fieldsOptions from '../../product/product-form/product-fields-options';

@Component({
  selector: 'product-new-modal',
  templateUrl: './product-new-modal.component.html',
  styleUrls: ['./product-new-modal.component.css']
})
export class ProductNewModalComponent implements OnInit {

  errors = {};

  form: FormGroup;

  @ViewChild(ModalComponent, {static: false})
  modal: ModalComponent;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

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

  ngOnInit() {

  }

  submit() {
    this.productHttp
      .create(this.form.value)
      .subscribe((product) => {  
        this.onSuccess.emit(product);      
        this.modal.hide();   
        this.form.reset({
          name: '',
          description: '',
          price: '',
          active: true
        });  
      }, error => this.onError.emit(error));
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
