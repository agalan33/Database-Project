import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../classes/message';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MessageService} from '../message.service';
import {ActivatedRoute} from '@angular/router';

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
  uid: number;
  mid: number;
  cid: number;

  constructor(private ms: MessageService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.uid = +this.route.snapshot.paramMap.get('uid');
    this.mid = +this.route.snapshot.paramMap.get('mid');
    this.cid = +this.route.snapshot.paramMap.get('cid');
  }

  onSend() {
    this.ms.sendReply(this.mid, this.uid, this.cid, this.replyForm.value).subscribe(
      reply => {
        this.replies.push(reply);
        this.replyForm.reset();
      }
    );

  }
}
