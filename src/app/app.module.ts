import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageComponent } from './message/message.component';
import { MaterialComponentsModule } from './material-components/material-components.module';
import { ChatComponent } from './chat/chat.component';
import { NavBarComponent } from './nav-bar/nav-bar.component'

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    ChatComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
