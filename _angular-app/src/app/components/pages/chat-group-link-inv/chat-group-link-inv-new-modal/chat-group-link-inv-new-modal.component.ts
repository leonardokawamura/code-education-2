import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChatGroupLinkInvHttpService } from '../../../../services/http/chat-group-link-inv-http.service';
import fieldsOptions from '../chat-group-link-inv-form/chat-group-link-inv-fields-options';

@Component({
  selector: 'chat-group-link-inv-new-modal',
  templateUrl: './chat-group-link-inv-new-modal.component.html',
  styleUrls: ['./chat-group-link-inv-new-modal.component.css']
})
export class ChatGroupLinkInvNewModalComponent implements OnInit {

  form: FormGroup;
  errors = {};

  @Input() groupId: number;

  @Output() onSuccess: EventEmitter < any > = new EventEmitter < any > ();  
  @Output() onError: EventEmitter < HttpErrorResponse > = new EventEmitter < HttpErrorResponse > ();

  @ViewChild(ModalComponent, {static: false}) modal: ModalComponent;  

  constructor(private linkInvHttp: ChatGroupLinkInvHttpService, private formBuilder: FormBuilder) {
    const min = fieldsOptions.total.validationMessage.min;
    this.form = this.formBuilder.group({
      total: [min, [Validators.required, Validators.min(min)]],
      expires_at: null,
      remaining: null
    });
  }

  ngOnInit() {}  

  submit() {
    this.linkInvHttp.create(this.groupId, this.form.value)
      .subscribe(
        linkInv => {
          this.form.reset({
            total: fieldsOptions.total.validationMessage.min,
            expires_at: null,
            remaining: null
          });
          this.errors = {};
          this.onSuccess.emit(linkInv);
          this.modal.hide();
        },
        responseError => {
          if (responseError.status === 422) {
            this.errors = responseError.error.errors;
          }
          this.onError.emit(responseError);
        }
      );
  }

  showModal() {
    this.modal.show();
  }
  hideModal() {
    this.modal.hide();
  }

  showErrors() {
    return Object.keys(this.errors).length !== 0;
  }

}
