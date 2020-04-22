import { Component, OnInit } from '@angular/core';
import { ChatGroupUserHttpService } from 'src/app/services/http/chat-group-user-http.service';
import { ActivatedRoute } from '@angular/router';
import { ChatGroup, User } from 'src/app/model';

@Component({
  selector: 'app-chat-group-user-list',
  templateUrl: './chat-group-user-list.component.html',
  styleUrls: ['./chat-group-user-list.component.css']
})
export class ChatGroupUserListComponent implements OnInit {

  chatGroup: ChatGroup;
  chatGroupId: number;
  users: Array<User> = [];

  pagination = {
    page: 1,
    totalItems: 0,
    itemsPerPage: 5
  }

  sortColumn = {column: 'created_at', sort: 'desc'};

  searchText: string = '';

  constructor(private chatGroupUserHttp: ChatGroupUserHttpService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.chatGroupId = params.chat_group;
      this.getUsers();
    });
  }

  getUsers() {
    this.chatGroupUserHttp.list(this.chatGroupId, {page: this.pagination.page})
      .subscribe(response => {
        this.chatGroup = response.data.chat_group;
        this.users = response.data.users;
        this.pagination.totalItems = response.meta.total;
        this.pagination.itemsPerPage = response.meta.per_page;
      });
  }

  pageChanged(page: number) {
    this.pagination.page = page;
    this.getUsers();
  }

  sort() {
    this.getUsers();
  }

  search(search: string) {
    this.searchText = search;
    this.getUsers();
  }

  onInsertSuccess($event) {
    this.getUsers();
  }

  onInsertError($event) {
    console.log($event)
  }

}
