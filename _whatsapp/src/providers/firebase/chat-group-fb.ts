import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseAuthProvider } from '../auth/firebase-auth';
import { Observable } from 'rxjs/Observable';
import { ChatGroup } from 'app/model';

/*
  Generated class for the ChatGroupFbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatGroupFbProvider {

  database;

  constructor(private firebaseAuth: FirebaseAuthProvider) {
    this.database = this.firebaseAuth.firebase.database();
  }

  list() {
    return Observable.create(observer => {
      this.database.ref('chat_groups').once('value', data => {
        const groupsRaw = data.val() as Array<ChatGroup>;
        const groupsKey = Object.keys(groupsRaw);
        const groups = [];
        for(const key of groupsKey) {
          groups.push(groupsRaw[key]);
        }
        observer.next(groups);
      }, error => console.log(error));
    });
  }

}
