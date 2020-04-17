import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import fieldsOptions from '../../category/category-form/category-fields-options';
import { ChatGroupHttpService } from 'src/app/services/http/chat-group-http.service';

@Component({
  selector: 'chat-group-new-modal',
  templateUrl: './chat-group-new-modal.component.html',
  styleUrls: ['./chat-group-new-modal.component.css']
})
export class ChatGroupNewModalComponent implements OnInit {

  errors = {};

  form: FormGroup;

  @ViewChild(ModalComponent, {static: false})
  modal: ModalComponent;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private chatGroupHttp: ChatGroupHttpService, private formBuilder: FormBuilder) {
    const maxlength = fieldsOptions.name.validationMessage.maxlength;
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(maxlength)]],
      photo: [null, Validators.required]
    });
  }

  ngOnInit() {

  }

  submit() {
    this.chatGroupHttp
      .create(this.form.value)
      .subscribe((chatGroup) => {  
        this.onSuccess.emit(chatGroup);      
        this.modal.hide();
        this.form.reset({
          name: '',
          photo: null
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
