import { Component, OnInit } from '@angular/core';
import { ChatGroup, ChatInvitationUser, ChatInvitationUserStatus } from '../../../../model';
import { ActivatedRoute } from '@angular/router';
import { ChatInvUserHttpService } from '../../../../services/http/chat-inv-user-http.service';

@Component({
  selector: 'app-chat-inv-user-list',
  templateUrl: './chat-inv-user-list.component.html',
  styleUrls: ['./chat-inv-user-list.component.css']
})
export class ChatInvUserListComponent implements OnInit {

  groupId: number;
  chatGroup: ChatGroup;
  invitations: Array<ChatInvitationUser> = [];
  STATUS =  ChatInvitationUserStatus;

  pagination = {
    page: 1,
    totalItems: 0,
    itemsPerPage: 5
  };

  sortColumn = {
    column: 'created_at',
    sort: 'desc'
  };

  constructor(private route: ActivatedRoute, private linkInvHttp: ChatInvUserHttpService) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.groupId = params.chat_group;
      this.getInvitations();
    });
  }

  getInvitations() {
    this.linkInvHttp.list(this.groupId, {
      page: this.pagination.page,
      sort: this.sortColumn.column === '' ? null : this.sortColumn
    }).subscribe(response => {
      this.chatGroup = response.data.group;
      this.invitations = response.data.invitations;
      this.pagination.totalItems = response.meta.total;
      this.pagination.itemsPerPage = response.meta.per_page;
    });
  }

  pageChanged(page) {
    this.pagination.page = page;
    this.getInvitations();
  }

  sort() {
    this.getInvitations();
  }

  onStatusChange($event: ChatInvitationUserStatus, inv: ChatInvitationUser) {
    inv.status = $event;
  }
}
