import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatGroup } from 'src/app/model';
import { ChatGroupNewModalComponent } from '../chat-group-new-modal/chat-group-new-modal.component';
import { ChatGroupEditModalComponent } from '../chat-group-edit-modal/chat-group-edit-modal.component';
import { ChatGroupDeleteModalComponent } from '../chat-group-delete-modal/chat-group-delete-modal.component';
import { ChatGroupHttpService } from 'src/app/services/http/chat-group-http.service';
import { ChatGroupInsertService } from './chat-group-insert.service';
import { ChatGroupEditService } from './chat-group-edit.service';
import { ChatGroupDeleteService } from './chat-group-delete.service';

@Component({
  selector: 'chat-group-list',
  templateUrl: './chat-group-list.component.html',
  styleUrls: ['./chat-group-list.component.css']
})
export class ChatGroupListComponent implements OnInit {

  chatGroups: Array<ChatGroup> = [];

  chatGroupId: number;

  pagination = {
    page: 1,
    totalItems: 0,
    itemsPerPage: 5
  }

  sortColumn = {column: 'created_at', sort: 'desc'};

  searchText: string = '';

  @ViewChild(ChatGroupNewModalComponent, {static: false})
  chatGroupNewModal: ChatGroupNewModalComponent;

  @ViewChild(ChatGroupEditModalComponent, {static: false})
  chatGroupEditModal: ChatGroupEditModalComponent;

  @ViewChild(ChatGroupDeleteModalComponent, {static: false})
  chatGroupDeleteModal: ChatGroupDeleteModalComponent;

  constructor(
    private chatGroupHttp: ChatGroupHttpService,
    public chatGroupInsertService: ChatGroupInsertService,
    public chatGroupEditService: ChatGroupEditService,
    public chatGroupDeleteService: ChatGroupDeleteService
  ) { 
    this.chatGroupInsertService.chatGroupListComponent = this;
    this.chatGroupEditService.chatGroupListComponent = this;
    this.chatGroupDeleteService.chatGroupListComponent = this;
  }

  ngOnInit() {
    this.getChatGroups();
  }

  getChatGroups() {
    this.chatGroupHttp.list({
        page: this.pagination.page,
        sort: this.sortColumn.column === '' ? null : this.sortColumn,
        search: this.searchText === '' ? null : this.searchText
      })
      .subscribe(response => {        
        this.chatGroups = response.data;
        this.pagination.totalItems = response.meta.total;
        this.pagination.itemsPerPage = response.meta.per_page;
      });
  }

  pageChanged(page: number) {
    this.pagination.page = page;
    this.getChatGroups();
  }

  sort() {
    this.getChatGroups();
  }

  search(search: string) {
    this.searchText = search;
    this.getChatGroups();
  }

}
