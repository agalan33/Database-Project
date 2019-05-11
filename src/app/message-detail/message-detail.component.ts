import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Message } from '../classes/message';
import { MessageService } from '../message.service';
import { take, first } from 'rxjs/operators';
import {Reaction} from '../classes/reaction.type';

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.scss']
})
export class MessageDetailComponent implements OnInit {
  private message: Message;
  private replies: Message[];
  private likes: Reaction[];
  private dislikes: Reaction[];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private msgService: MessageService
  ) { }

  ngOnInit(): void {
    this.route.data
      .subscribe((data: {message: Message}) => {
        this.message = data.message;
      });
    this.getMessageAndReplies();
    this.getLikes();
    this.getDislikes();
  }

  getMessageAndReplies(): void {
    const id = +this.route.snapshot.paramMap.get('mid');
    this.msgService.getReplies(id).subscribe(
      replies => this.replies = replies
    );
  }

  getLikes() {
    this.msgService.getLikes(this.message.mid).subscribe( likes => {
      this.likes = likes;
    });
  }
  getDislikes() {
    this.msgService.getDislikes(this.message.mid).subscribe( dislikes => {
      this.dislikes = dislikes;
    });
  }

  goBack(): void {
    this.location.back();
  }

}
