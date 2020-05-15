import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseAuthProvider } from '../auth/firebase-auth';
import { Observable } from 'rxjs/Observable';
import { ChatGroup, Role, ChatMessage } from '../../app/model';
import { AuthProvider } from '../../providers/auth/auth';
import { ChatMessageHttpProvider } from 'providers/http/chat-message-http';

/*
  Generated class for the ChatGroupFbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatGroupFbProvider {

  database;

  constructor(private firebaseAuth: FirebaseAuthProvider,
              private auth: AuthProvider) {
    this.database = this.firebaseAuth.firebase.database();
  }

  list() {
    return Observable.create(observer => {
      this.database.ref('chat_groups').orderByChild('updated_at').once('value', data => {
        const groupsRaw = data.val() as Array<ChatGroup>;
        const groupsKey = Object.keys(groupsRaw).reverse();
        const groups = [];
        for(const key of groupsKey) {
          groupsRaw[key].is_member = this.getMember(groupsRaw[key]);
          groupsRaw[key].last_message = this.getLastMessage(groupsRaw[key]);
          groups.push(groupsRaw[key]);
        }
        observer.next(groups);
      }, error => console.log(error));
    });
  }

  private getMember(group: ChatGroup): Observable<boolean> {
    return Observable.create(observer => {
      if(this.auth.me.role === Role.SELLER) {
        observer.next(true);
        return;
      }
      this.database
        .ref(`chat_groups_users/${group.id}/${this.auth.me.profile.firebase_uid}`)
        .on('value', data => {
          return data.exists() ? observer.next(true) : observer.next(false);
        });
    });
  }

  private getLastMessage(group: ChatGroup): Observable<ChatMessage> {   
    return Observable.create(observer => {
      this.database
        .ref(`chat_groups_messages/${group.id}/last_message_id`)
        .on('value', data => {
          if(!data.exists()) {            
            return;
          }
          const lastMessageId = data.val();
          this.getMessage(group, lastMessageId)
            .subscribe(message => observer.next(message));
        });
    });
  }

  private getMessage(group: ChatGroup, lastMessageId: string): Observable<ChatMessage> {    
    return Observable.create(observer => {
      this.database
        .ref('chat_groups_messages/' + group.id + '/messages/' + lastMessageId)
        .once('value', data => {          
          const message = data.val() as ChatMessage;
          this.getUser(message.user_id)
            .subscribe((user) => {
              message.user = user;
              observer.next(message);
            });
        });
    });
  }

  private getUser(userId) {
    return Observable.create(observer => {
      this.database
        .ref(`users/${userId}`)
        .once('value', data => {          
          const user = data.val();
          observer.next(user);
        });
    });
  }

}
