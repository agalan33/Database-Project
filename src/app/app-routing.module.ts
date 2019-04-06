import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { MessageDetailComponent } from './message-detail/message-detail.component';
import { MessageDetailResolverService } from './message-detail-resolver.service';

const routes: Routes = [
  {path: "chat", component: ChatComponent},
  {
    path: "chat/messages/:mid",
    component: MessageDetailComponent,
    resolve: {
      message: MessageDetailResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
