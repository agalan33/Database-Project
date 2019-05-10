import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chats } from '../classes/chats.type';
import { Router } from '@angular/router';
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
  constructor(private httpClient: HttpClient, private router: Router, private navBarService: NavBarService) { }

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

  goToChat(index: number) {
    this.router.navigateByUrl(this.pURL);
  }

}
