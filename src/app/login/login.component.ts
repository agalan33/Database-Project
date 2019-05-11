import { Component, OnInit, Input, HostListener } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { HttpClient } from '@angular/common/http';
import { User } from '../classes/user.type';
import { NavBarService } from '../nav-bar/nav-bar.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public usr: User;
  private userURL = 'http://127.0.0.1:5000/DbProject/users/username/';
  @Input() navbar: NavBarComponent;

  constructor(private  httpClient: HttpClient, private navBarService: NavBarService, private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  @HostListener('login')
  login(email: string, password: string) {
    const newURL = this.userURL.concat(email);
    this.httpClient.get<User>(newURL).subscribe(data => {
      this.usr = data;
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
