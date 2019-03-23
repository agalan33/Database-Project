import { Component, OnInit } from '@angular/core';
import { Message } from '../message';
import { MESSAGES } from '../mock-messages';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  private messages: Message[] = MESSAGES;

  constructor() { }

  ngOnInit() {
  }

}
