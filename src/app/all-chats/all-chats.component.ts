import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chats} from '../classes/chats.type';

@Component({
  selector: 'app-all-chats',
  templateUrl: './all-chats.component.html',
  styleUrls: ['./all-chats.component.scss']
})
export class AllChatsComponent implements OnInit {
  public chats = [];
  public chatsURL = 'http://127.0.0.1:5000/DbProject/users/1/chats';
  public headers = ['cname'];
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get<Chats[]>(this.chatsURL).subscribe(data => {
      this.chats = data;
    });
  }

}
