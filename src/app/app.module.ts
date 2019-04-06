import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageComponent } from './message/message.component';
import { MaterialComponentsModule } from './material-components/material-components.module';
import { ChatComponent } from './chat/chat.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MessageDetailComponent } from './message-detail/message-detail.component';
import { RepliesComponent } from './replies/replies.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    ChatComponent,
    NavBarComponent,
    MessageDetailComponent,
    RepliesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
