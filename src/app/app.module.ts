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
import {MatNativeDateModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContactListComponent } from './contact-list/contact-list.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AddContactComponent } from './add-contact/add-contact.component';
@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    NavBarComponent,
    LoginComponent,
    CreateAccountComponent,
    ContactListComponent,
    HomeComponent,
    AddContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FlexLayoutModule,
    HttpClientModule,
  ],
  entryComponents: [
    AddContactComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
