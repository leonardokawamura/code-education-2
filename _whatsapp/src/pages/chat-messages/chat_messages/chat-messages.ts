import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, InfiniteScroll } from 'ionic-angular';
import { ChatMessage, ChatGroup } from '../../../app/model';
import { ChatMessageFbProvider } from '../../../providers/firebase/chat-message-fb';
import { IsCurrentUserPipe } from '../../../pipes/is-current-user/is-current-user';
import { RedirectIfNotAuthProvider } from '../../../providers/redirect-if-not-auth/redirect-if-not-auth';
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
              private chatMessageFb: ChatMessageFbProvider,
              private isCurrentUser: IsCurrentUserPipe,
              private redirectIfNotAuth: RedirectIfNotAuthProvider) {
    this.chatGroup = this.navParams.get('chat_group');    
  }

  ionViewCanEnter() {
    return this.redirectIfNotAuth.ionViewCanEnter();
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
        this.messages.push(message); 
        if(this.isCurrentUser.transform(message.value.user_id)) {
          return;
        }
        this.countNewMessages++;
      });  
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

  scrollToBottomOnTextAreaClicked() {
    setTimeout(() => {
      this.content.scrollToBottom(0);
    }, 500);
  }

  showButtonScrollBottom() {
    const dimensions = this.content.getContentDimensions();
    const contentHeight = dimensions.contentHeight;
    const scrollTop = dimensions.scrollTop;
    const scrollHeight = dimensions.scrollHeight;

    return scrollHeight > scrollTop + contentHeight;
  }

}
