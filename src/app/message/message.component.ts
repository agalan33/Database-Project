import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../classes/message';

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

  constructor() {}

  ngOnInit() {
    this.modified = false;
    this.likes = 0;
    this.dislikes =0;
  }

  selectionChanged(value: any) {
    if(value == "like"){
      if(this.modified)
        this.dislikes--;
      this.likes++;
    }else{
      if(this.modified)
        this.likes--;
      this.dislikes++;
    }
    this.modified = true;
  }


}
