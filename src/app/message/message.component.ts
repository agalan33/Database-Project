import {Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges} from '@angular/core';
import { Message } from '../classes/message';
import { MessageService } from '../message.service';
import {ActivatedRoute} from '@angular/router';

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
  uid: number;
  cid: number;
  rid: number;

  constructor(private ms: MessageService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.uid = + this.route.snapshot.paramMap.get('uid');
    this.cid = + this.route.snapshot.paramMap.get('cid');
    this.getNumLikes();
    this.getNumDislikes();
    this.getUserReaction(this.message.mid, this.uid);
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

  getUserReaction(mid: number, uid: number) {
    this.ms.getUserReaction(mid, uid).subscribe(reaction => {
      if (reaction) {
        this.rid = reaction.rid;
        if (reaction.rlike === 1) {
          this.selectedValue = 'like';
        } else if (reaction.rdislike === 1) {
          this.selectedValue = 'dislike';
        }
        this.modified = true;
      } else {
        this.modified = false;
      }
    });
  }

  selectionChanged(value: any) {
    if (value === 'like') {
      if (this.modified) {
        this.ms.updateReaction(this.rid, this.message.mid, this.uid, this.cid, 1, 0).subscribe();
      } else {
        this.ms.insertReaction(this.message.mid, this.uid, this.cid, 1, 0).subscribe(react => {
          this.rid = react.rid;
        });
      }
    } else {
      if (this.modified) {
        this.ms.updateReaction(this.rid, this.message.mid, this.uid, this.cid, 0, 1).subscribe();
      } else {
        this.ms.insertReaction(this.message.mid, this.uid, this.cid, 0, 1).subscribe(react => {
          this.rid = react.rid;
        });
      }
    }
    this.getNumLikes();
    this.getNumDislikes();
    this.modified = true;
  }


}
