import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ChatMessageHttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatMessageHttpProvider {

  constructor(public http: HttpClient) {}

  create(chatGroupId: number, data: {content, type}) {
    const formData = new FormData();
    formData.append('content', data.content);
    formData.append('type', data.type);
    return this.http.post(`http://dev.code-education.com.br/api/chat_groups/${chatGroupId}/messages`, formData);
  }

}
