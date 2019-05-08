import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chats } from '../classes/chats.type';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';

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
  public uid: number;
  constructor(private httpClient: HttpClient, private router: Router, private route: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit() {
    this.uid = + this.route.snapshot.paramMap.get('uid');
    this.httpClient.get<Chats[]>(this.chatsURL).subscribe(data => {
      this.chats = data;
    });
  }

  newChat(uid: number) {
    return;
  }

  goToChat(index: number) {
    this.router.navigateByUrl(this.pURL);
  }

}
