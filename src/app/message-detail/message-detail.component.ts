import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Message } from '../message';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.scss']
})
export class MessageDetailComponent implements OnInit {
  private message: Message;
  private replies: Message[];
  private likes: any[];
  private dislikes: any[];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private msgService: MessageService
  ) { }

  ngOnInit(): void {
    this.getMessageAndReplies();
  }

  getMessageAndReplies(): void {
    const id = +this.route.snapshot.paramMap.get('mid');
    this.msgService.getMessage(id).subscribe(
      msg => this.message = msg
    );
    this.msgService.getReplies(id).subscribe(
      replies => this.replies = replies
    )
  }

  goBack(): void {
    this.location.back();
  }

}
