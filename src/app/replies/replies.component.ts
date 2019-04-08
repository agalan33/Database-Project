import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../message';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-replies',
  templateUrl: './replies.component.html',
  styleUrls: ['./replies.component.scss']
})
export class RepliesComponent implements OnInit {
  @Input() replies: Message[];
  replyForm = new FormGroup({
    mtext: new FormControl('', Validators.required)
  });

  constructor() {}

  ngOnInit() {
  }

  onSend(){
    let newMessage: Message = {
      mid: 1000,
      ufirst_name: 'This',
      ulast_name: 'User',
      mimage: null,
      mtext: this.replyForm.value.mtext,
      likes: 0,
      dislikes: 0,
      mdate: '2019-04-07 03:57:23.530286 +00:00'
    };
    this.replies.push(newMessage);
    this.replyForm.reset();
  }
}
