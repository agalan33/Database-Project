import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Message } from '../classes/message';
import { MessageService } from '../message.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NewMessage} from '../classes/newMessage';
import {MatDialog, MatDialogConfig, MatSnackBar} from '@angular/material';
import {ManageMembersComponent} from '../manage-members/manage-members.component';
import {User} from '../classes/user.type';
import {Contact} from '../classes/contact.type';
import {NavBarService} from '../nav-bar/nav-bar.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  private messages: Message[] = [];
  private usr: User;
  private owner: User;
  messageForm = new FormGroup({
    mimage: new FormControl('', Validators.required),
    mtext: new FormControl('', Validators.required)
  });
  uid: number;
  cid: number;


  constructor(private msgService: MessageService, private route: ActivatedRoute, private dialog: MatDialog, private router: Router,
              private navBarService: NavBarService, private httpClient: HttpClient, private snackBar: MatSnackBar,
              private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.cid = + this.route.snapshot.paramMap.get('cid');
    this.uid = + this.route.snapshot.paramMap.get('uid');
    this.getMessages(this.cid);
    this.getChatOwner();
  }

  getMessages(cid: number) {
    this.navBarService.isLogged();
    this.navBarService.changeLogin.subscribe(data => {
      if (data) {
        this.usr = this.navBarService.getCurrentUser();
      }
    });
    this.msgService.getMessages(cid).subscribe(
      (data: Message[]) => {
        data.map(item => this.messages.push(item));
      }
    );
  }

  onFileChange(event) {
    this.messageForm.patchValue({
             mimage: event.target.files[0]
           });

    // const reader = new FileReader();
    //
    // if (event.target.files && event.target.files.length) {
    //   const [file] = event.target.files;
    //   reader.readAsDataURL(file);
    //
    //   reader.onload = () => {
    //     this.messageForm.patchValue({
    //       mimage: reader.result
    //     });
    //
    //     // need to run CD since file load runs outside of zone
    //     this.cd.markForCheck();
    //   };
    // }
  }

  onSend() {
    const mimage: File = this.messageForm.controls.mimage.value;
    const mtext: string = this.messageForm.controls.mtext.value;
    this.msgService.sendMessage(this.uid, this.cid, mtext, mimage).subscribe(msg => {
      msg.likes = 0;
      msg.dislikes = 0;
      console.log(msg);
      this.messages.push(msg);
    });
    this.messageForm.reset();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '400px';
    dialogConfig.width = '800px';
    this.dialog.open(ManageMembersComponent, dialogConfig);
  }
  deleteChat() {
    const chatID = this.router.url.charAt(this.router.url.length - 1);
    if (this.owner.uid === this.usr.uid) {
      const chatURL = 'http://127.0.0.1:5000/DbProject/users/';
      const url = chatURL.concat(String(this.usr.uid));
      const finishedURL = url.concat('/chats/');
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: {'uid': this.usr.uid, 'cid': Number(chatID)}
      };
      this.httpClient.delete(finishedURL.concat(chatID), httpOptions).subscribe(data => {
        if (data['Result']) {
          this.snackBar.open('Chat Deleted', '', {
            duration: 5000
          });
          window.history.back();
        }
      });
    } else {

    }
  }
  getChatOwner() {
    const chatID = this.router.url.charAt(this.router.url.length - 1);
    const chatURL = 'http://127.0.0.1:5000/DbProject/chats/';
    const finishedURL = chatURL.concat(String(chatID));
    this.httpClient.get<User>(finishedURL.concat('/owner')).subscribe( data => {
      this.owner = data;
    });
  }
}
