import { Component, OnInit } from '@angular/core';
import { Message } from '../classes/message';
import { MessageService } from '../message.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {NewMessage} from '../classes/newMessage';

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
  uid: number;
  cid: number;


  constructor(private msgService: MessageService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.cid = + this.route.snapshot.paramMap.get('cid');
    this.uid = + this.route.snapshot.paramMap.get('uid');
    this.getMessages(this.cid);
  }

  getMessages(cid: number) {
    this.msgService.getMessages(cid).subscribe(
      (data: Message[]) => {
        data.map(item => this.messages.push(item));
      }
    );
  }

  onSend() {
    const newMessage: NewMessage = this.messageForm.value;
    this.msgService.sendMessage(this.uid, this.cid, newMessage).subscribe(msg => {
      msg.likes = 0;
      msg.dislikes = 0;
      console.log(msg);
      this.messages.push(msg);
    });
    this.messageForm.reset();
  }
}
