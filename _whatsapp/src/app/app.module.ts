import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Select } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginOptionsPage } from '../pages/login-options/login-options'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPhoneNumberPage } from '../pages/login-phone-number/login-phone-number';
import { ResetPhoneNumberPage } from '../pages/reset-phone-number/reset-phone-number';
import { FirebaseAuthProvider } from '../providers/auth/firebase-auth';
import { AuthProvider } from '../providers/auth/auth';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MainPage } from '../pages/main/main';
import { CustomerCreatePage } from '../pages/customer-create/customer-create';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerHttpProvider } from '../providers/http/customer-http';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { ChatGroupListComponent } from '../components/chat-group-list/chat-group-list';
import { ChatMessagesPageModule } from '../pages/chat-messages/chat_messages/chat-messages.module';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ChatMessageHttpProvider } from '../providers/http/chat-message-http';
import { Media } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { ChatGroupFbProvider } from '../providers/firebase/chat-group-fb';
import { PipesModule } from '../pipes/pipes.module';
import { ChatGroupViewerProvider } from '../providers/chat-group-viewer/chat-group-viewer';
import { DirectivesModule } from '../directives/directives.module';
import { StoragePermissionProvider } from '../providers/storage-permission/storage-permission';
import { Diagnostic } from '@ionic-native/diagnostic';
import { FirebasePhoneNumberCheckComponent } from '../components/firebase-phone-number-check/firebase-phone-number-check';
import { SelectCountriesCodeComponent } from '../components/select-countries-code/select-countries-code';
import { RefreshTokenInterceptor } from '../providers/auth/refresh-token-interceptor';
import { RedirectIfNotAuthProvider } from '../providers/redirect-if-not-auth/redirect-if-not-auth';
import { MoreOptionsComponent } from '../components/more-options/more-options';
import { FirebaseMessaging } from '@ionic-native/firebase-messaging';
import { PushNotificationProvider } from '../providers/push-notification/push-notification';
import { UserProfileHttp } from '../providers/http/user-profile-http';
import { FirebaseDynamicLinks } from '@ionic-native/firebase-dynamic-links';
import { ChatInvitationProvider } from '../providers/chat-invitation/chat-invitation';
import { ProductListComponent } from '../components/product-list/product-list';
import { ProductHttpProvider } from '../providers/http/product-http.';
import { ProductSearchbarComponent } from '../components/product-searchbar/product-searchbar';

function jwtFactory(authService: AuthProvider) {
  return {
    whitelistedDomains: [
      new RegExp('dev.code-education.com.br/*'),
      new RegExp('192.168.1.6:8000/*'),
      new RegExp('192.168.1.6:8100/*'),
      new RegExp('192.168.1.4:5555/*')
    ],
    tokenGetter: () => {
      return authService.getToken()
    }
  }
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginOptionsPage,
    LoginPhoneNumberPage,
    ResetPhoneNumberPage,
    CustomerCreatePage,
    MainPage,
    ChatGroupListComponent,
    FirebasePhoneNumberCheckComponent,
    SelectCountriesCodeComponent,
    MoreOptionsComponent,
    ProductListComponent,
    ProductSearchbarComponent    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    ReactiveFormsModule,
    SuperTabsModule.forRoot(),
    ChatMessagesPageModule,
    PipesModule,
    DirectivesModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS, 
        useFactory: jwtFactory,
        deps: [ AuthProvider ]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginOptionsPage,
    LoginPhoneNumberPage,
    ResetPhoneNumberPage,
    CustomerCreatePage,
    MainPage,
    ChatGroupListComponent,
    FirebasePhoneNumberCheckComponent,
    SelectCountriesCodeComponent,
    MoreOptionsComponent,
    ProductListComponent,
    ProductSearchbarComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseAuthProvider,
    AuthProvider,
    CustomerHttpProvider,
    ChatMessageHttpProvider,
    Media,
    File,
    ChatGroupFbProvider,
    ChatGroupViewerProvider,
    StoragePermissionProvider,
    Diagnostic,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptor,
      multi: true
    },
    RedirectIfNotAuthProvider,
    FirebaseMessaging,
    PushNotificationProvider,
    UserProfileHttp,
    FirebaseDynamicLinks,
    ChatInvitationProvider,
    ProductHttpProvider   
  ]
})
export class AppModule {}
