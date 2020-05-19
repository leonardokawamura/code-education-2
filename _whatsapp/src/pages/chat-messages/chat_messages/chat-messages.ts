import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, InfiniteScroll } from 'ionic-angular';
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
  showContent = false;
  canMoreMessages = true;
  countNewMessages = 0;

  @ViewChild(Content) content: Content;

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
      .subscribe(messages => {
        this.messages = messages;
        setTimeout(() => {
          this.scrollToBottom();
          this.showContent = true;
        }, 500);
      });

    this.chatMessageFb.onAdded(this.chatGroup)
      .subscribe((message) => {
        console.log(message);
        //this.messages.push(message); 
      })  
  }

  doInfinite(infiniteScroll: InfiniteScroll) {
    this.chatMessageFb.oldest(this.chatGroup, this.limit, this.messages[0].key)
      .subscribe((messages) => {
        if(!messages.length) {
          this.canMoreMessages = false;
        }
        this.messages.unshift(...messages);
        infiniteScroll.complete();
      }, () => infiniteScroll.complete());
  }

  scrollToBottom() {
    this.countNewMessages = 0;
    this.content.scrollToBottom(0);
  }

  showButtonScrollBottom() {
    const dimensions = this.content.getContentDimensions();
    const contentHeight = dimensions.contentHeight;
    const scrollTop = dimensions.scrollTop;
    const scrollHeight = dimensions.scrollHeight;

    return scrollHeight > scrollTop + contentHeight;
  }

}
