import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  create_account(first_name: string, last_name: string, email: string, password: string, confitm: string, username: string,) {

  }
}
