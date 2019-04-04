import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {CreateAccountComponent} from './create-account/create-account.component';
import { ContactListComponent } from './contact-list/contact-list.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'create_account', component: CreateAccountComponent},
  {path: 'contact-list', component: ContactListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
