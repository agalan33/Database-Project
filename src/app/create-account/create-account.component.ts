import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { NavBarService } from '../nav-bar/nav-bar.service';
import { Router } from '@angular/router';
import { User } from '../classes/user.type';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  private userURL = 'http://127.0.0.1:5000/DbProject/users/username/';
  constructor(private httpClient: HttpClient, private  snackBar: MatSnackBar, private navBarService: NavBarService, private router: Router) { }
  public usr: User;
  ngOnInit() {
  }
  create_account(first_name: string, last_name: string, email: string, password: string, confirm: string, username: string, phone_number: string, age: string) {
    if (first_name && last_name && email && password && confirm && username && phone_number && age) {
      if (password !== confirm) {
        this.snackBar.open('Confirm password does not match with Password.', '', {
          duration: 5000
        });
      } else if (!email.includes('@')) {
        this.snackBar.open('Email must be a legit email.', '', {
          duration: 5000
        });
      } else {
        const url = 'http://127.0.0.1:5000/DbProject/create_account';
        this.httpClient.post(url, {
          'email': email,
          'password': password,
          'username': username,
          'first_name': first_name,
          'last_name': last_name,
          'age': Number(age),
          'phone_number': phone_number
        }).subscribe(data => {
          if (data['CreatedUser']) {
            this.login(username, password);
          } else {
            this.snackBar.open('Something went wrong.', '', {
              duration: 5000
            });
          }
        });
      }
    } else {
      this.snackBar.open('Missing fields, please fill all the fields.', '', {
        duration: 4000
      });
    }
  }
  @HostListener('login')
  login(username: string, password: string) {
    const newURL = this.userURL.concat(username);
    this.httpClient.get<User>(newURL).subscribe(data => {
      this.usr = data;
      console.log(data);
      if (this.usr.upassword === password) {
        this.navBarService.login(this.usr);
        this.navBarService.isLogged();
        this.router.navigateByUrl('/my-profile');
      } else {
        this.snackBar.open('Wrong password or email', '', {
          duration: 1000
        });
      }
    } );
  }
}
