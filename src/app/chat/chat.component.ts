import { Component, OnInit } from '@angular/core';
import { Message } from '../classes/message';
import { MessageService } from '../message.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  private messages: Message[] = [];
  messageForm = new FormGroup({
    mimage: new FormControl(''),
    mtext: new FormControl('', Validators.required)
  });


  constructor(private msgService: MessageService, private route: ActivatedRoute) { }

  ngOnInit() {
    const cid = + this.route.snapshot.paramMap.get('cid');
    this.getMessages(cid);
  }

  getMessages(cid: number) {
    this.msgService.getMessages(cid).subscribe(
      (data: Message[]) => {
        data.map(item => this.messages.push(item));
      }
    );
  }

  onSend() {
    const newMessage: Message = {
      mid: 1000,
      ufirst_name: 'This',
      ulast_name: 'User',
      mimage: this.messageForm.value.mimage,
      mtext: this.messageForm.value.mtext,
      likes: 0,
      dislikes: 0,
      mdate: '2019-04-07 03:57:23.530286 +00:00'
    };
    this.messages.push(newMessage);
    this.messageForm.reset();
  }

}
