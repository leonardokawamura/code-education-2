import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { User, ChatGroup } from 'src/app/model';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { UserHttpService } from 'src/app/services/http/user-http.service';
import { ChatGroupUserHttpService } from 'src/app/services/http/chat-group-user-http.service';
import { ChatGroupHttpService } from 'src/app/services/http/chat-group-http.service';

@Component({
  selector: 'chat-group-user-delete-modal',
  templateUrl: './chat-group-user-delete-modal.component.html',
  styleUrls: ['./chat-group-user-delete-modal.component.css']
})
export class ChatGroupUserDeleteModalComponent implements OnInit {

  chatGroup: ChatGroup;
  user: User;
  _chatGroupId: number;
  _userId: number;


  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  @ViewChild(ModalComponent, {static: false}) modal: ModalComponent;

  constructor(private chatGroupUserHttp: ChatGroupUserHttpService,
              private chatGroupHttp: ChatGroupHttpService,
              private userHttp: UserHttpService) { }

  ngOnInit() {
  }

  @Input()
  set chatGroupId(value) {
    this._chatGroupId = value;
    if (this._chatGroupId) {
      this.chatGroupHttp
        .get(this._chatGroupId)   
        .subscribe(chatGroup => this.chatGroup = chatGroup);
    }    
  }

  @Input()
  set userId(value) {
    this._userId = value;
    if (this._userId) {
      this.userHttp
        .get(this._userId)   
        .subscribe(user => this.user = user);
    }    
  }

  destroy() {
    this.chatGroupUserHttp
      .destroy(this._chatGroupId, this._userId)
      .subscribe(chatGroup => {  
        this.onSuccess.emit(chatGroup);      
        this.modal.hide();   
      }, error => this.onError.emit(error));
  }

  showModal() {
    this.modal.show();
  }

  hideModal($event: Event) {
    
  }

}
