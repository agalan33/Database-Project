import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageComponent } from './message/message.component';
import { MaterialComponentsModule } from './material-components/material-components.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatSnackBarModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContactListComponent } from './contact-list/contact-list.component';
import { HomeComponent } from './home/home.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { ChatComponent } from './chat/chat.component';
import { MessageDetailComponent } from './message-detail/message-detail.component';
import { RepliesComponent } from './replies/replies.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AllChatsComponent } from './all-chats/all-chats.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { ProfileComponent } from './profile/profile.component';
import {NavBarService} from './nav-bar/nav-bar.service';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AddChatComponent } from './add-chat/add-chat.component';

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    NavBarComponent,
    LoginComponent,
    CreateAccountComponent,
    ContactListComponent,
    HomeComponent,
    AddContactComponent,
    ChatComponent,
    NavBarComponent,
    MessageDetailComponent,
    RepliesComponent,
    AllChatsComponent,
    DashboardComponent,
    AllChatsComponent,
    ProfileComponent,
    EditUserComponent,
    AllChatsComponent,
    AddChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialComponentsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FlexLayoutModule,
    HttpClientModule,
    GoogleChartsModule.forRoot(),
    MatSnackBarModule
  ],
  entryComponents: [
    AddContactComponent,
    EditUserComponent,
    AddChatComponent
  ],
  providers: [NavBarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
