import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {CreateAccountComponent} from './create-account/create-account.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';
import { AllChatsComponent} from './all-chats/all-chats.component';
import { MessageDetailComponent } from './message-detail/message-detail.component';
import { MessageDetailResolverService } from './message-detail-resolver.service';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProfileComponent} from './profile/profile.component';

const routes: Routes = [
  {path: 'my-profile', component: ProfileComponent},
  {path: 'users/:uid/chats/:cid', component: ChatComponent},
  {
    path: 'users/:uid/chats/:cid/messages/:mid',
    component: MessageDetailComponent,
    resolve: {
      message: MessageDetailResolverService
    }
  },
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'create_account', component: CreateAccountComponent},
  {path: 'contact-list', component: ContactListComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'all-chats', component: AllChatsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
