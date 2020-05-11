import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseAuthProvider } from '../auth/firebase-auth';
import { Observable } from 'rxjs/Observable';
import { ChatGroup, Role } from '../../app/model';
import { AuthProvider } from '../../providers/auth/auth';

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
          groups.push(groupsRaw[key]);
        }
        observer.next(groups);
      }, error => console.log(error));
    });
  }

  getMember(group: ChatGroup): Observable<boolean> {
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

}