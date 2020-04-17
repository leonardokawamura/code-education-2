import { Component } from '@angular/core';
import { FirebaseAuthProvider } from '../../providers/auth/firebase-auth';

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

  text: string;

  constructor(private firebaseAuth: FirebaseAuthProvider) {
    console.log('Hello ChatGroupListComponent Component');
    this.text = 'Hello World';
  }

  ngOnInit() {
    const database = this.firebaseAuth.firebase.database();
    database.ref('chat_groups').on('value', function(data) {
      console.log(data.val());
    });
  }

}
