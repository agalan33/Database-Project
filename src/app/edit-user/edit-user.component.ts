import { Component, OnInit } from '@angular/core';
import {NavBarService} from '../nav-bar/nav-bar.service';
import {HttpClient} from '@angular/common/http';
import {User} from '../classes/user.type';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  private usr: User;
  private userURL = 'http://127.0.0.1:5000/DbProject/users/';
  constructor(private navBarService: NavBarService, private httpClient: HttpClient, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.navBarService.isLogged();
    this.navBarService.changeLogin.subscribe(data => {
      if (data) {
        this.usr = this.navBarService.getCurrentUser();
        document.getElementById('email').setAttribute('value', this.usr.uemail);
        document.getElementById('password').setAttribute('value', this.usr.upassword);
        document.getElementById('username').setAttribute('value', this.usr.username);
        document.getElementById('fname').setAttribute('value', this.usr.ufirst_name);
        document.getElementById('lname').setAttribute('value', this.usr.ulast_name);
        document.getElementById('age').setAttribute('value', String(this.usr.uage));
        document.getElementById('pnumber').setAttribute('value', this.usr.uphone);
      }
    });
  }
  save(first_name: string, last_name: string, email: string, password: string, username: string, phone_number: string, age: string) {
    if (first_name && last_name && email && password && username && phone_number && age) {
      const url = this.userURL.concat(String(this.usr.uid));
      this.httpClient.put(url, {
        'email': email,
        'password': password,
        'username': username,
        'first_name': first_name,
        'last_name': last_name,
        'age': Number(age),
        'phone_number': phone_number,
        'uid': this.usr.uid
      }).subscribe(data => {
        if (data['Result'] === 'Success') {
          window.location.reload();
        } else {
          this.snackBar.open('Unexpected error', '', {
            duration: 4000
          });
        }
      });
    } else {
      this.snackBar.open('Missing fields, please fill all the fields.', '', {
        duration: 4000
      });
    }
  }
}
