import {Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges} from '@angular/core';
import { Message } from '../classes/message';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() message: Message;
  likes: number;
  dislikes: number;
  selectedValue: string;
  modified: boolean;

  constructor(private ms: MessageService) {}

  ngOnInit() {
    this.modified = false;
    this.getNumLikes();
    this.getNumDislikes();
  }

  getNumLikes() {
    this.ms.getNumLikes(this.message.mid).subscribe(likes => {
      this.likes = likes;
    });
  }

  getNumDislikes() {
    this.ms.getNumDislikes(this.message.mid).subscribe(dislikes => {
      this.dislikes = dislikes;
    });
  }

  selectionChanged(value: any) {
    if (value === 'like') {
      if (this.modified) {
        this.dislikes--;
      }
      this.likes++;
    } else {
      if (this.modified) {
        this.likes--;
      }
      this.dislikes++;
    }
    this.modified = true;
  }


}
