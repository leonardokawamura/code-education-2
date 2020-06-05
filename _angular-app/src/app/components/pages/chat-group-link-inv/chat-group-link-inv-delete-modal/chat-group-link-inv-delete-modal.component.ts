import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { ChatGroupLinkInvHttpService } from '../../../../services/http/chat-group-link-inv-http.service';

@Component({
  selector: 'chat-group-link-inv-delete-modal',
  templateUrl: './chat-group-link-inv-delete-modal.component.html',
  styleUrls: ['./chat-group-link-inv-delete-modal.component.css']
})
export class ChatGroupLinkInvDeleteModalComponent implements OnInit {

  @Input() groupId: number;
  @Input() linkInvId: number;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  @ViewChild(ModalComponent, {static: false}) modal: ModalComponent;

  constructor(private linkInvHttp: ChatGroupLinkInvHttpService) { }

  ngOnInit() {
  }

  destroy() {
    this.linkInvHttp
      .destroy(this.groupId, this.linkInvId)
      .subscribe(
        response => {  
          this.onSuccess.emit(response);      
          this.modal.hide();   
        }, 
        error => this.onError.emit(error)
      );
  }

  showModal() {
    this.modal.show();
  }

  hideModal($event: Event) {
    
  }

}
