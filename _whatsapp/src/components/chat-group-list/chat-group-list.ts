import { Component } from '@angular/core';
import { FirebaseAuthProvider } from '../../providers/auth/firebase-auth';
import { ChatGroup, ChatMessage } from '../../app/model';
import { ChatGroupFbProvider } from '../../providers/firebase/chat-group-fb';
import { App } from 'ionic-angular';
import { ChatMessagesPage } from '../../pages/chat-messages/chat_messages/chat-messages';
import { ChatGroupViewerProvider } from '../../providers/chat-group-viewer/chat-group-viewer';

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
export class ChatGroupListComponent {

  groups: ChatGroup[] = [];
  chatActive: ChatGroup;

  constructor(private firebaseAuth: FirebaseAuthProvider,
              private chatGroupFb: ChatGroupFbProvider,
              private app: App,
              private chatGroupViewer: ChatGroupViewerProvider) {}

  ngOnInit() {
    this.chatGroupFb.list()
      .subscribe(groups => {
        groups.forEach((group) => {
          this.chatGroupViewer.loadViewed(group);
        });
        this.groups = groups
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
      
    /* const database = this.firebaseAuth.firebase.database();
    database.ref('chat_groups').on('child_added', data => {
      const group = data.val() as ChatGroup;
      this.groups.push(group);
    }, error => console.log(error));
    database.ref('chat_groups').on('child_changed', data => {
      const group = data.val() as ChatGroup;
      const index = this.groups.findIndex((g) => g.id == group.id);
      if(index !== -1) {
        this.groups[index] = group;
      }
    }); */
  }

  formatTextMessage(message: ChatMessage) {
    const maxLenght = 20;
    return message.content.length > maxLenght ? message.content.slice(0, maxLenght) : message.content;
  }

  goToMessages(group: ChatGroup) {
    this.chatGroupViewer.viewed(group);
    this.chatActive = group;
    this.app.getRootNav().push(ChatMessagesPage, {'chat_group': group});
  }

}
