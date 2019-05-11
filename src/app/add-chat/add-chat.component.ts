import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {Chats} from '../classes/chats.type';
import {MessageService} from '../message.service';

export interface DialogData {
  uid: number;
}

@Component({
  selector: 'app-add-chat',
  templateUrl: './add-chat.component.html',
  styleUrls: ['./add-chat.component.scss']
})
export class AddChatComponent implements OnInit {
  cname = new FormControl('', [Validators.required, Validators.maxLength(20)]);

  constructor(public dialogRef: MatDialogRef<AddChatComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private ms: MessageService) { }

  ngOnInit() {
  }

  addChat() {
    this.ms.newChat(this.data.uid, this.cname.value).subscribe((newChat: Chats) => {
      this.dialogRef.close(newChat);
    });
    // const chat: Chats = {
    //   cid: 4,
    //   cname: this.cname.value,
    //   uid: 1
    // };
    // this.dialogRef.close(chat);
  }

}
