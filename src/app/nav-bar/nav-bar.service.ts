import { Injectable, Output, EventEmitter, OnInit} from '@angular/core';
import { User } from '../classes/user.type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class NavBarService {

  isLoggedIn = false;
  user: any;

  @Output() changeLogin: EventEmitter<boolean> = new EventEmitter();
  @Output() changeUser: EventEmitter<User> = new EventEmitter();
  @Output() changeLiked: EventEmitter<boolean> = new EventEmitter();
  constructor(private httpClient: HttpClient, private router: Router) {}
  ngOnInit() {
  }

  isLogged() {
    const url = 'http://127.0.0.1:5000/DbProject/userstatus';
    this.httpClient.get<User>(url).subscribe(data => {
      if (data['uid'] != null) {
        console.log('access granted');
        this.user = data;
        this.changeUser.emit(this.user);
        this.isLoggedIn = true;
        this.changeLogin.emit(this.isLoggedIn);
      } else {
        console.log('access denied');
        this.user = null;
        this.changeUser.emit(this.user);
        this.isLoggedIn = false;
        this.changeLogin.emit(this.isLoggedIn);
      }
    });
  }

  getCurrentUser() {
    return this.user;
  }

  login(usr: User) {
    const url = 'http://127.0.0.1:5000/DbProject/login/';
    const finishedUrl = url.concat(String(usr.uid));
    this.httpClient.get<User>(finishedUrl).subscribe(data => {
      console.log(data);
    });
    this.isLoggedIn = true;
    this.changeLogin.emit(this.isLoggedIn);
  }
}
