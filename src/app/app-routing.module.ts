import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { MessageDetailComponent } from './message-detail/message-detail.component'

const routes: Routes = [
  {path: "chat", component: ChatComponent},
  {path: "chat/messages/:mid", component: MessageDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
