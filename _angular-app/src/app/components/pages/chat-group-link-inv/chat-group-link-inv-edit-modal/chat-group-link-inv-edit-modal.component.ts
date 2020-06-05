import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChatGroupLinkInvHttpService } from '../../../../services/http/chat-group-link-inv-http.service';
import fieldsOptions from '../chat-group-link-inv-form/chat-group-link-inv-fields-options';

@Component({
  selector: 'chat-group-link-inv-edit-modal',
  templateUrl: './chat-group-link-inv-edit-modal.component.html',
  styleUrls: ['./chat-group-link-inv-edit-modal.component.css']
})
export class ChatGroupLinkInvEditModalComponent implements OnInit {

  form: FormGroup;
  errors = {};

  _linkInvId: number;
  _groupId: number;  

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
    this.linkInvHttp.update(this._groupId, this._linkInvId, this.form.value)
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
        });
    return false;
  }

  @Input()
  set groupId(value) {
    this._groupId = value;
    this.getLinkInvitation();
  }

  @Input()
  set linkInvId(value) {
    this._linkInvId = value;
    this.getLinkInvitation();
  }

  getLinkInvitation() {
    if (this._groupId && this._linkInvId) {
      this.linkInvHttp.get(this._groupId, this._linkInvId)
        .subscribe(
          linkInv => {
            const data: any = linkInv;
            data.expires_at = data.expires_at ? data.expires_at.date.substring(0, 10) : null;
            this.form.patchValue(data);
          }
        );
    }
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
