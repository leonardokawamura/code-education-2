import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ToastController } from 'ionic-angular';
import { ChatGroupListComponent } from '../../components/chat-group-list/chat-group-list';
import { AudioRecorderProvider } from '../../providers/audio-recorder/audio-recorder';
import { RedirectIfNotAuthProvider } from '../../providers/redirect-if-not-auth/redirect-if-not-auth';
import { MoreOptionsComponent } from '../../components/more-options/more-options';
import { PushNotificationProvider } from '../../providers/push-notification/push-notification';
import { FirebaseMessaging } from '@ionic-native/firebase-messaging';
import { SuperTab, SuperTabs } from 'ionic2-super-tabs';
import { ChatInvitationProvider } from '../../providers/chat-invitation/chat-invitation';
import { ProductListComponent } from '../../components/product-list/product-list';

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  chatGroupList = ChatGroupListComponent;
  productList = ProductListComponent;
  canShowSearchbar = false;

  @ViewChild(SuperTabs) superTabs: SuperTabs;
  @ViewChild('tabChatGroupList') tabChatGroupList: SuperTab;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private audioRecorder: AudioRecorderProvider,
              private redirectIfNotAuth: RedirectIfNotAuthProvider,
              private popover: PopoverController,
              private pushNotification: PushNotificationProvider,
              private chatInvitation: ChatInvitationProvider,
              private toastCtrl: ToastController) {  
  }

  ionViewCanEnter() {
    return this.redirectIfNotAuth.ionViewCanEnter();
  }

  ionViewDidLoad() {
    this.pushNotification.registerToken();
    this.pushNotification.onNewMesaage()
      .subscribe(data => {
        console.log(data);
        if(data.background) {
          const component: ChatGroupListComponent = this.tabChatGroupList.getViews()[0].instance;
          component.goToMessagesFromNotification(data.data.chat_group_id);
        }
      });
    this.pushNotification.onChatGroupSubscribe()
      .subscribe(data => {
        console.log(data);
        const toast = this.toastCtrl.create({
          message: `Sua inscrição no grupo ${data.data.chat_group_name} foi aprovada`,
          duration: 7000
        });
        toast.present();
      });    
    const hasPermissionToRecorder = this.audioRecorder.hasPermission;
    this.audioRecorder.requestPermission()
      .then((result) => {
        console.log('permissao para gravar', result);
        if(result && !hasPermissionToRecorder) {
          this.audioRecorder.showAlertToCloseApp();
        }
      });
    this.chatInvitation.requestInvitation();
  }

  presentMoreOptions(event) {
    const popover = this.popover.create(MoreOptionsComponent);
    popover.present({
      ev: event
    });
  }

  get canShowSearchIcon() {
    const superTab = this.superTabs.getActiveTab();
    return superTab.tabId === 'products';
  }

  onTabSelect(event) {
    if(event.id !== 'products') {
      this.canShowSearchbar = false;
    }
  }

}
