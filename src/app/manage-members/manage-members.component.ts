import { Component, OnInit } from '@angular/core';
import {Contact} from '../classes/contact.type';
import {NavBarService} from '../nav-bar/nav-bar.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../classes/user.type';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig, MatSnackBar} from '@angular/material';
import {AddContactToChatComponent} from '../add-contact-to-chat/add-contact-to-chat.component';

@Component({
  selector: 'app-manage-members',
  templateUrl: './manage-members.component.html',
  styleUrls: ['./manage-members.component.scss']
})
export class ManageMembersComponent implements OnInit {
  private usr: User;
  private membersURL = 'http://127.0.0.1:5000/DbProject/chats/';
  private members: Contact[] = [];
  public headers = ['username', 'ufirst_name', 'ulast_name', 'uphone', 'uemail', 'delete'];
  constructor(private  navBarService: NavBarService, private httpClient: HttpClient, private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.navBarService.isLogged();
    this.navBarService.changeLogin.subscribe(data => {
      if (data) {
        this.usr = this.navBarService.getCurrentUser();
        this.getChatMembers();
        }
      });
  }
  getChatMembers() {
    const chatID = this.router.url.charAt(this.router.url.length - 1);
    const url = this.membersURL.concat(String(chatID));
    const finishedURL = url.concat('/users');
    this.httpClient.get<Contact[]>(finishedURL).subscribe( data => {
      this.members = data;
      for (let i = 0; i < data.length; i++) {
        if (this.members[i].contactid === this.usr.uid) {
          const me = '(Me) ';
          this.members[i].username = me.concat(this.members[i].username);
        }
      }
    });
  }
  removeMember(id: number) {
    if (id === this.usr.uid) {
      this.snackBar.open('Cant delete yourself', '', {
        duration: 5000
      });
    } else {
      const chatID = this.router.url.charAt(this.router.url.length - 1);
      const url = this.membersURL.concat(String(chatID));
      const finishedURL = url.concat('/users');
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: {'uid': id, 'cid': Number(chatID)}
      };
      this.httpClient.delete(finishedURL, httpOptions).subscribe( data => {
        if (data['Result']) {
          window.location.reload();
        }
      });
    }
  }
  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '400px';
    dialogConfig.width = '600px';
    this.dialog.open(AddContactToChatComponent, dialogConfig);
  }

}
