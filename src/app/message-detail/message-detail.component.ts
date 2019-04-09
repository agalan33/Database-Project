import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Message } from '../classes/message';
import { MessageService } from '../message.service';
import { take, first } from 'rxjs/operators';

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
  likesnum: number;
  dislikesnum: number;
  selectedValue: string;
  modified: boolean;

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
    this.modified = false;
    this.likesnum = 0;
    this.dislikesnum =0;
  }

  getMessageAndReplies(): void {
    const id = +this.route.snapshot.paramMap.get('mid');
    this.msgService.getReplies(id).subscribe(
      replies => this.replies = replies
    )
  }

  goBack(): void {
    this.location.back();
  }

  selectionChanged(value: any) {
    if(value == "like"){
      if(this.modified)
        this.dislikesnum--;
      this.likesnum++;
    }else{
      if(this.modified)
        this.likesnum--;
      this.dislikesnum++;
    }
    this.modified = true;
  }

}
