import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chats } from '../classes/chats.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-chats',
  templateUrl: './all-chats.component.html',
  styleUrls: ['./all-chats.component.scss']
})
export class AllChatsComponent implements OnInit {
  public chats = [];
  public chatsURL = 'http://127.0.0.1:5000/DbProject/users/1/chats';
  public headers = ['cname'];
  public pURL = '/chat';
  public cURL = '';
  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {
    this.httpClient.get<Chats[]>(this.chatsURL).subscribe(data => {
      this.chats = data;
    });
  }

  goToChat(index: number) {
    this.router.navigateByUrl(this.pURL);
  }

}
