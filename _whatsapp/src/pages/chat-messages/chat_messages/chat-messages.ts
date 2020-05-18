import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatMessage, ChatGroup } from '../../../app/model';
import { ChatMessageFbProvider } from '../../../providers/firebase/chat-message-fb';
/**
 * Generated class for the ChatMessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-messages',
  templateUrl: 'chat-messages.html',
})
export class ChatMessagesPage {

  chatGroup: ChatGroup;
  messages: {key: string, value: ChatMessage}[] = [];
  limit = 20;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private chatMessageFb: ChatMessageFbProvider) {
    //this.chatGroup = this.navParams.get('chat_group');
    this.chatGroup = {
      id: 1,
      name: '',
      photo_url: ''
    };
  }

  ionViewDidLoad() {
    this.chatMessageFb.latest(this.chatGroup, this.limit)
      .subscribe(messages => this.messages = messages);
  }

}
