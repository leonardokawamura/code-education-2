import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { ChatGroupHttpService } from 'src/app/services/http/chat-group-http.service';
import { ChatGroup } from 'src/app/model';
import fieldsOptions from '../chat-group-form/chat-group-fields-options';

@Component({
  selector: 'chat-group-edit-modal',
  templateUrl: './chat-group-edit-modal.component.html',
  styleUrls: ['./chat-group-edit-modal.component.css']
})
export class ChatGroupEditModalComponent implements OnInit {

  _chatGroupId: number;
  chatGroup: ChatGroup;
  form: FormGroup;  

  errors = {};

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  @ViewChild(ModalComponent, {static: false}) modal: ModalComponent;  

  constructor(private chatGroupHttp: ChatGroupHttpService, private formBuilder: FormBuilder) {
    const maxlength = fieldsOptions.name.validationMessage.maxlength;
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(maxlength)]],
      photo: null,
      photo_url: null
    })
  }

  ngOnInit() {
  }

  submit() {
    this.chatGroupHttp
      .update(this._chatGroupId, this.form.value)
      .subscribe((chatGroup) => {  
        this.onSuccess.emit(chatGroup);      
        this.modal.hide();        
      }, error => this.onError.emit(error));
  }

  showModal(chatGroupId) {
    this._chatGroupId = chatGroupId;
    this.getChatGroup();
    this.modal.show();
  }

  getChatGroup() {
    this.chatGroupHttp
      .get(this._chatGroupId)   
      .subscribe(
        chatGroup => {
          this.chatGroup = chatGroup;
          this.form.patchValue(chatGroup);
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
    this.form.reset();
    this.errors = {};
  }

}
