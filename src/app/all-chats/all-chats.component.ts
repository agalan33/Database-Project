import {Component, OnInit, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chats } from '../classes/chats.type';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatTable} from '@angular/material';
import {AddChatComponent} from '../add-chat/add-chat.component';
import {Contact} from '../classes/contact.type';
import {NavBarService} from '../nav-bar/nav-bar.service';
import {User} from '../classes/user.type';

@Component({
  selector: 'app-all-chats',
  templateUrl: './all-chats.component.html',
  styleUrls: ['./all-chats.component.scss']
})
export class AllChatsComponent implements OnInit {
  public chats = [];
  public usr: User;
  public chatsURL = 'http://127.0.0.1:5000/DbProject/users/';
  public headers = ['cname'];
  public pURL = '/chat';
  public cURL = '';
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(private httpClient: HttpClient, private router: Router,
              private route: ActivatedRoute, private dialog: MatDialog, private navBarService: NavBarService) { }

  ngOnInit() {
    this.navBarService.isLogged();
    this.navBarService.changeLogin.subscribe(data => {
      if (data) {
        this.usr = this.navBarService.getCurrentUser();
        const url = this.chatsURL.concat(String(this.usr.uid));
        const finishedURL = url.concat('/chats');
        this.httpClient.get<Chats[]>(finishedURL).subscribe(chat => {
          this.chats = chat;
        });
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddChatComponent, {data: { uid: this.usr.uid }});

    dialogRef.afterClosed().subscribe((result: Chats) => {
      if (result) {
        this.chats.push(result);
        this.table.renderRows();
      }
      console.log('The dialog was closed');
      console.log(this.chats);
    });
  }

  goToChat(index: number) {
    this.router.navigateByUrl(this.pURL);
  }

}
