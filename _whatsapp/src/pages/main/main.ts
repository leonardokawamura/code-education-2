import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ToastController } from 'ionic-angular';
import { ChatGroupListComponent } from '../../components/chat-group-list/chat-group-list';
import { AudioRecorderProvider } from '../../providers/audio-recorder/audio-recorder';
import { RedirectIfNotAuthProvider } from '../../providers/redirect-if-not-auth/redirect-if-not-auth';
import { MoreOptionsComponent } from '../../components/more-options/more-options';
import { PushNotificationProvider } from '../../providers/push-notification/push-notification';
import { SuperTab, SuperTabs } from 'ionic2-super-tabs';
import { ChatInvitationProvider } from '../../providers/chat-invitation/chat-invitation';
import { ProductListComponent } from '../../components/product-list/product-list';
import { OrderListComponent } from '../../components/order-list/order-list';
import { ProductSearchProvider } from '../../providers/product-search/product-search';

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
  orderList = OrderListComponent;
  canShowSearchbar = false;
  selectedTabIndex = 0;

  @ViewChild(SuperTabs) superTabs: SuperTabs;
  @ViewChild('tabChatGroupList') tabChatGroupList: SuperTab;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private audioRecorder: AudioRecorderProvider,
              private redirectIfNotAuth: RedirectIfNotAuthProvider,
              private popover: PopoverController,
              private pushNotification: PushNotificationProvider,
              private chatInvitation: ChatInvitationProvider,
              private toastCtrl: ToastController,
              private productSearch: ProductSearchProvider) {
    if (this.navParams.get('selectedTabIndex')) {
      this.selectedTabIndex = this.navParams.get('selectedTabIndex');
    }                         
  }

  ionViewCanEnter() {
    return this.redirectIfNotAuth.ionViewCanEnter();
  }

  ionViewDidLoad() {           
    this.pushNotification.registerToken();
    this.pushNotification.onNewMesaage()
      .subscribe(data => {
        if(data.background) {
          const component: ChatGroupListComponent = this.tabChatGroupList.getViews()[0].instance;
          component.goToMessagesFromNotification(data.data.chat_group_id);
        }
      });
    this.pushNotification.onChatGroupSubscribe()
      .subscribe(data => {
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
    if (this.superTabs) {
      const superTab = this.superTabs.getActiveTab();
      return superTab.tabId === 'products';
    }
    return false;
  }

  onTabSelect(event) {
    if(event.id !== 'products') {
      this.canShowSearchbar = false;
    }
  }

  openSearchBar() {
    this.canShowSearchbar = true; 
    this.productSearch.onOpenSearchBar.next(true); 
  }
}
