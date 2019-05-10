import {Component, OnInit, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chats } from '../classes/chats.type';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatTable} from '@angular/material';
import {AddChatComponent} from '../add-chat/add-chat.component';

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
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(private httpClient: HttpClient, private router: Router, private route: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit() {
    this.uid = + this.route.snapshot.paramMap.get('uid');
    console.log(this.uid);
    this.httpClient.get<Chats[]>(this.chatsURL).subscribe(data => {
      this.chats = data;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddChatComponent, {data: { uid: this.uid }});

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
