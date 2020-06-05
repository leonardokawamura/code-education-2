import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatGroup, ChatGroupLinkInvitation } from '../../../../model';
import { ActivatedRoute } from '@angular/router';
import { ChatGroupLinkInvHttpService } from '../../../../services/http/chat-group-link-inv-http.service';
import { ChatGroupLinkInvNewModalComponent } from '../chat-group-link-inv-new-modal/chat-group-link-inv-new-modal.component';
import { ChatGroupLinkInvEditModalComponent } from '../chat-group-link-inv-edit-modal/chat-group-link-inv-edit-modal.component';
import { ChatGroupLinkInvDeleteModalComponent } from '../chat-group-link-inv-delete-modal/chat-group-link-inv-delete-modal.component';
import { ChatGroupLinkInvInsertService } from './chat-group-link-inv-insert.service';
import { ChatGroupLinkInvEditService } from './chat-group-link-inv-edit.service';
import { ChatGroupLinkInvDeleteService } from './chat-group-link-inv-delete.service';

@Component({
  selector: 'chat-group-link-inv-list',
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

  @ViewChild(ChatGroupLinkInvNewModalComponent, {static: false})
  linkInvNewModal: ChatGroupLinkInvNewModalComponent;

  @ViewChild(ChatGroupLinkInvEditModalComponent, {static: false})
  linkInvEditModal: ChatGroupLinkInvEditModalComponent;

  @ViewChild(ChatGroupLinkInvDeleteModalComponent, {static: false})
  linkInvDeleteModal: ChatGroupLinkInvDeleteModalComponent;

  constructor(private route: ActivatedRoute,
              private linkInvHttp: ChatGroupLinkInvHttpService,
              protected linkInvInsertService: ChatGroupLinkInvInsertService,
              protected linkInvEditService: ChatGroupLinkInvEditService,
              protected linkInvDeleteService: ChatGroupLinkInvDeleteService) { 
    this.linkInvInsertService.linkInvListComponent = this;
    //this.linkInvEditService.linkInvListComponent = this;
    //this.linkInvDeleteService.linkInvListComponent = this;
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
