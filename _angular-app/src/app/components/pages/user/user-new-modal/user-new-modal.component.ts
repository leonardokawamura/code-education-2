import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { UserHttpService } from 'src/app/services/http/user-http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import fieldsOptions from '../../user/user-form/user-fields-options';

@Component({
  selector: 'user-new-modal',
  templateUrl: './user-new-modal.component.html',
  styleUrls: ['./user-new-modal.component.css']
})
export class UserNewModalComponent implements OnInit {

  form: FormGroup;  

  errors = {};

  @ViewChild(ModalComponent, {static: false}) modal: ModalComponent;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private userHttp: UserHttpService, private formBuilder: FormBuilder) {
    const maxlength = fieldsOptions.name.validationMessage.maxlength;
    const minlength = fieldsOptions.password.validationMessage.minlength;
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(maxlength)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(maxlength)]],
      password: ['', [Validators.required, Validators.maxLength(maxlength), Validators.minLength(minlength)]]
    })
  }

  ngOnInit() {
    
  }

  submit() {
    this.userHttp
      .create(this.form.value)
      .subscribe((user) => {  
        this.onSuccess.emit(user);      
        this.modal.hide();      
      }, error => this.onError.emit(error));
  }

  showModal() {
    this.form.reset();
    this.modal.show();
  }

  showErrors() {
    return Object.keys(this.errors).length != 0;
  }

  hideModal($event: Event) {
    this.errors = {};
    this.form.reset();
  }

}
