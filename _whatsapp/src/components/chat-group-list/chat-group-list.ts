import { Component, OnInit } from '@angular/core';
import { ChatGroup, ChatMessage } from '../../app/model';
import { ChatGroupFbProvider } from '../../providers/firebase/chat-group-fb';
import { App } from 'ionic-angular';
import { ChatMessagesPage } from '../../pages/chat-messages/chat_messages/chat-messages';
import { ChatGroupViewerProvider } from '../../providers/chat-group-viewer/chat-group-viewer';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/first';

/**
 * Generated class for the ChatGroupListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chat-group-list',
  templateUrl: 'chat-group-list.html'
})
export class ChatGroupListComponent implements OnInit {

  groups: ChatGroup[] = [];
  chatActive: ChatGroup;
  chatGroupIdToFirstOpen = null;
  isMember$: Observable<boolean>[] = [];
  showNoGroups = false;

  constructor(private chatGroupFb: ChatGroupFbProvider,
              private app: App,
              private chatGroupViewer: ChatGroupViewerProvider) {}

  ngOnInit() {
    this.chatGroupFb.list()
      .subscribe(
        groups => {
          groups.forEach((group) => {
            this.chatGroupViewer.loadViewed(group);
            this.isMember$.push(group.is_member.first());
          });
          this.groups = groups;
          this.goToMessagesFromNotification();        
      }, 
      error => console.log(error),
      () => {
        Observable.forkJoin(...this.isMember$).subscribe(results => {
          this.showNoGroups = results.every(value => !value);
        });        
      });

    this.chatGroupFb.onAdded()
      .subscribe(group => {
        this.chatGroupViewer.loadViewed(group);
        this.groups.unshift(group);
      });

    this.chatGroupFb.onChanged()
      .subscribe(group => {
        const index = this.groups.findIndex((g => g.id === group.id));
        if(index === -1) {
          return;
        }
        if(!this.chatActive || group.id !== this.chatActive.id) {
          this.chatGroupViewer.loadViewed(group);
        } else {
          this.chatGroupViewer.viewed(group);
        }        
        this.groups.splice(index, 1);
        this.groups.unshift(group);
      });    
  }

  formatTextMessage(message: ChatMessage) {
    const maxLenght = 20;
    return message.content.length > maxLenght ? message.content.slice(0, maxLenght) : message.content;
  }

  goToMessagesFromNotification(chatGroupId = null) {
    if(chatGroupId) {
      this.chatGroupIdToFirstOpen = chatGroupId;
    }
    if(this.chatGroupIdToFirstOpen) {
      const group = this.getById(this.chatGroupIdToFirstOpen);
      if(group) {
        this.goToMessages(group);
      }
    }
  }

  getById(chatGroupId) {
    // push notification is always string instead of use === we'l use == (group.id == chatGroupId)
    const index = this.groups.findIndex(group => group.id == chatGroupId);
    return index === -1 ? null : this.groups[index];
  }

  goToMessages(group: ChatGroup) {
    this.chatGroupViewer.viewed(group);
    this.chatActive = group;
    this.app.getRootNav().push(ChatMessagesPage, {'chat_group': group});
  }

}
