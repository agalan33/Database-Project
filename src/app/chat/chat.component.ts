import { Component, OnInit } from '@angular/core';
import { Message } from '../message';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  private messages: Message[] = [];

  constructor(private msgService: MessageService) { }

  ngOnInit() {
    this.getMessages();
  }

  getMessages() {
    this.msgService.getMessages().subscribe(
      (data: Message[]) =>
        {data.map(item => this.messages.push(item));
        console.log(this.messages);}
    );
  }

}
