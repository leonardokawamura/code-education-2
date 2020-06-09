import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { ProductCategoryListComponent } from './components/pages/product-category/product-category-list/product-category-list.component';
import { AuthGuard } from './guards/auth.guard';
import { CategoryListComponent } from './components/pages/category/category-list/category-list.component';
import { ProductListComponent } from './components/pages/product/product-list/product-list.component';
import { UserListComponent } from './components/pages/user/user-list/user-list.component';
import { ProductInputListComponent } from './components/pages/product-input/product-input-list/product-input-list.component';
import { ProductOutputListComponent } from './components/pages/product-output/product-output-list/product-output-list.component';
import { ProductPhotoManagerComponent } from './components/pages/product-photo/product-photo-manager/product-photo-manager.component';
import { UserProfileComponent } from './components/pages/user-profile/user-profile.component';
import { ChatGroupListComponent } from './components/pages/chat-group/chat-group-list/chat-group-list.component';
import { ChatGroupUserListComponent } from './components/pages/chat-group-user/chat-group-user-list/chat-group-user-list.component';
import { ChatGroupLinkInvListComponent } from './components/pages/chat-group-link-inv/chat-group-link-inv-list/chat-group-link-inv-list.component';
import { ChatInvUserListComponent } from './components/pages/chat-inv-user/chat-inv-user-list/chat-inv-user-list.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'products/:product/categories/list',
    component: ProductCategoryListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'products/:product/photos/manager',
    component: ProductPhotoManagerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'categories/list',
    component: CategoryListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'products/list',
    component: ProductListComponent,
    canActivate: [AuthGuard]
  },  
  {
    path: 'inputs/list',
    component: ProductInputListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'outputs/list',
    component: ProductOutputListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users/list',
    component: UserListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'chat-groups/list',
    component: ChatGroupListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'chat-groups/:chat_group/users/list',
    component: ChatGroupUserListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'chat-groups/:chat_group/link-invitations/list',
    component: ChatGroupLinkInvListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'chat-groups/:chat_group/user-invitations/list',
    component: ChatInvUserListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { 

  
}
