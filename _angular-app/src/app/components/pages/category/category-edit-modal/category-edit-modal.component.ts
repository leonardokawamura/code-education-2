import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryHttpService } from 'src/app/services/http/category-http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import fieldsOptions from '../../product/product-form/product-fields-options';

@Component({
  selector: 'category-edit-modal',
  templateUrl: './category-edit-modal.component.html',
  styleUrls: ['./category-edit-modal.component.css']
})
export class CategoryEditModalComponent implements OnInit {

  _categoryId: number;

  form: FormGroup;  

  errors = {};

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  @ViewChild(ModalComponent, {static: false}) modal: ModalComponent;  

  constructor(private categoryHttp: CategoryHttpService, private formBuilder: FormBuilder) {
    const maxlength = fieldsOptions.name.validationMessage.maxlength;
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(maxlength)]],
      active: true
    })
  }

  ngOnInit() {
  }

  submit() {
    this.categoryHttp
      .update(this._categoryId, this.form.value)
      .subscribe((category) => {  
        this.form.reset();
        this.onSuccess.emit(category);      
        this.modal.hide();   
      }, error => this.onError.emit(error));
  }

  showModal(categoryId) {
    this._categoryId = categoryId;
    this.getCategory();
    this.modal.show();
  }

  getCategory() {
    this.categoryHttp
      .get(this._categoryId)   
      .subscribe(
        category => this.form.patchValue(category),
        responseError => {
          if(responseError.status == 401) {
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
  }

}
