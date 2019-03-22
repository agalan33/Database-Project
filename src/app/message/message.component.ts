import { Component, OnInit, Input } from '@angular/core'
import { Message } from '../message'

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() message: Message;

  constructor() {}

  ngOnInit() {
    this.message = {
      'id': 1,
      'userName': "Shiba Inu",
      'imgUrl': "https://material.angular.io/assets/img/examples/shiba2.jpg",
      'message': "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.",
      'likes': 10,
      'dislikes': 5
    }

  }

}
