import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NotifyMessageService } from '../../../../services/notify-message.service';
import { ChatInvUserHttpService } from '../../../../services/http/chat-inv-user-http.service';
import { ChatInvitationUserStatus, ChatInvitationUser } from '../../../../model';

@Component({
  selector: 'chat-inv-user-status',
  templateUrl: './chat-inv-user-status.component.html',
  styleUrls: ['./chat-inv-user-status.component.css']
})
export class ChatInvUserStatusComponent implements OnInit {

  @Input() groupId: number;
  @Input() invitation: ChatInvitationUser;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();

  constructor(private chatInvUserHttp: ChatInvUserHttpService, private notifyMessage: NotifyMessageService) {}

  ngOnInit() {}

  approve() {
    this.update(ChatInvitationUserStatus.APPROVE);
  }

  reprove() {
    this.update(ChatInvitationUserStatus.REPROVE);
  }

  update(status: ChatInvitationUserStatus) {
    this.chatInvUserHttp
      .update(this.groupId, this.invitation.id, status)
      .subscribe(() => {
        this.onSuccess.emit(status);
        this.notifyMessage.success('Salvo com sucesso');
      });
  }

}
