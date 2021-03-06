import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { UserHttpService } from 'src/app/services/http/user-http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import fieldsOptions from '../../user/user-form/user-fields-options';

@Component({
  selector: 'user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.css']
})
export class UserEditModalComponent implements OnInit {

  form: FormGroup;  

  errors = {};

  _userId: number;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  @ViewChild(ModalComponent, {static: false}) modal: ModalComponent;  

  constructor(private userHttp: UserHttpService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: ['', [
        Validators.required, 
        Validators.maxLength(fieldsOptions.name.validationMessage.maxlength)
      ]],
      email: ['', [
        Validators.required, 
        Validators.maxLength(fieldsOptions.email.validationMessage.maxlength)
      ]],
      password: ['', [
        //Validators.required, 
        Validators.maxLength(fieldsOptions.password.validationMessage.maxlength), 
        Validators.minLength(fieldsOptions.password.validationMessage.minlength)
      ]]
    })
  }

  ngOnInit() {
  }

  submit() {
    this.userHttp
      .update(this._userId, this.form.value)
      .subscribe(
        user => {
          this.onSuccess.emit(user);      
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

  showModal(userId: number) {
    this._userId = userId;
    this.form.reset();
    this.getUser();
    this.modal.show();
  }

  getUser() {
    this.userHttp
      .get(this._userId)   
      .subscribe(
        user => {
          this.form.patchValue(user)
        },
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
    this.errors = {};
  }

}
