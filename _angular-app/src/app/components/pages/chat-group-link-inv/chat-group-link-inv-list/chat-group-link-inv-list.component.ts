import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatGroup, ChatGroupLinkInvitation } from '../../../../model';
import { ChatGroupNewModalComponent } from '../../chat-group/chat-group-new-modal/chat-group-new-modal.component';
import { ChatGroupEditModalComponent } from '../../chat-group/chat-group-edit-modal/chat-group-edit-modal.component';
import { ChatGroupDeleteModalComponent } from '../../chat-group/chat-group-delete-modal/chat-group-delete-modal.component';
import { ActivatedRoute } from '@angular/router';
import { ChatGroupLinkInvHttpService } from '../../../../services/http/chat-group-link-inv-http.service';
import { ChatGroupLinkInvNewModalComponent } from '../chat-group-link-inv-new-modal/chat-group-link-inv-new-modal.component';
import { ChatGroupLinkInvEditModalComponent } from '../chat-group-link-inv-edit-modal/chat-group-link-inv-edit-modal.component';
import { ChatGroupLinkInvDeleteModalComponent } from '../chat-group-link-inv-delete-modal/chat-group-link-inv-delete-modal.component';
import { ChatGroupLinkInvInsertService } from './chat-group-link-inv-insert.service';
import { ChatGroupLinkInvEditService } from './chat-group-link-inv-edit.service';
import { ChatGroupLinkInvDeleteService } from './chat-group-link-inv-delete.service';

@Component({
  selector: 'app-chat-group-link-inv-list',
  templateUrl: './chat-group-link-inv-list.component.html',
  styleUrls: ['./chat-group-link-inv-list.component.css']
})
export class ChatGroupLinkInvListComponent implements OnInit {

  groupId: number;
  linkInvIdToEdit: number;
  linkInvIdToDelete: number;
  chatGroup: ChatGroup;
  linkInvitations: Array<ChatGroupLinkInvitation> = [];  

  pagination = {
    page: 1,
    totalItems: 0,
    itemsPerPage: 5
  }

  sortColumn = {column: 'created_at', sort: 'desc'};

  searchText: string = '';

  @ViewChild(ChatGroupNewModalComponent, {static: false})
  linkInvNewModal: ChatGroupLinkInvNewModalComponent;

  @ViewChild(ChatGroupEditModalComponent, {static: false})
  linkInvEditModal: ChatGroupLinkInvEditModalComponent;

  @ViewChild(ChatGroupDeleteModalComponent, {static: false})
  linkInvDeleteModal: ChatGroupLinkInvDeleteModalComponent;

  constructor(
    private route: ActivatedRoute,
    private linkInvHttp: ChatGroupLinkInvHttpService,
    protected linkInvInsertService: ChatGroupLinkInvInsertService,
    protected linkInvEditService: ChatGroupLinkInvEditService,
    protected linkInvDeleteService: ChatGroupLinkInvDeleteService
  ) { 
    //this.linkInvInsertService.chatGroupLinkInvListComponent = this;
    //this.linkInvEditService.chatGroupLinkInvListComponent = this;
    //this.linkInvDeleteService.chatGroupLinkInvListComponent = this;
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.groupId = params.chat_group;
      this.getLinkInvitations();
    });
  }

  getLinkInvitations() {
    this.linkInvHttp.list(this.groupId, {
        page: this.pagination.page,
        sort: this.sortColumn.column === '' ? null : this.sortColumn,
        search: this.searchText === '' ? null : this.searchText
      })
      .subscribe(response => {        
        this.chatGroup = response.data.group;
        this.linkInvitations = response.data.link_invitations;
        this.pagination.totalItems = response.meta.total;
        this.pagination.itemsPerPage = response.meta.per_page;
      });
  }

  pageChanged(page: number) {
    this.pagination.page = page;
    this.getLinkInvitations();
  }

  sort() {
    this.getLinkInvitations();
  }

  search(search: string) {
    this.searchText = search;
    this.getLinkInvitations();
  }

}
