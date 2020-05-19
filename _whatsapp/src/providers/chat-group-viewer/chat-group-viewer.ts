import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChatGroup } from '../../app/model';
import { Observable } from 'rxjs/Observable';

const CHAT_GROUPS_VIEWED_KEY = 'chat_groups_viewed';

/*
  Generated class for the ChatGroupViewerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatGroupViewerProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ChatGroupViewerProvider Provider');
  }

  loadViewed(group: ChatGroup) {
    this.setChatGroup(group);
  }

  private hasViewed(group: ChatGroup): Observable<boolean> {
    return Observable.create((observer) => {

    });
  }

  private setChatGroup(group: ChatGroup) {
    const collection = this.collection;
    collection[group.id] = {name: group.name};
    this.collection = collection;
  }
   
  private get collection() {
    const collection = window.localStorage.getItem(CHAT_GROUPS_VIEWED_KEY);
    return collection ? JSON.parse(collection) : {};
  }

  private set collection(value) {
    window.localStorage.setItem(CHAT_GROUPS_VIEWED_KEY, JSON.stringify(value));
  }
  

}
