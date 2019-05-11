import { Component, OnInit } from '@angular/core';
import {NavBarService} from '../nav-bar/nav-bar.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {User} from '../classes/user.type';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {EditUserComponent} from '../edit-user/edit-user.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private usr: User;
  constructor(private navBarService: NavBarService, private httpClient: HttpClient, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.navBarService.isLogged();
    this.navBarService.changeLogin.subscribe(data => {
      if (data) {
        this.usr = this.navBarService.getCurrentUser();
      }
    });
  }
  logout() {
    const url = 'http://127.0.0.1:5000/DbProject/logout';
    this.httpClient.get<User>(url).subscribe(data => {
      this.navBarService.isLogged();
      this.router.navigateByUrl('/login');
    });
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '400px';
    dialogConfig.width = '600px';
    this.dialog.open(EditUserComponent, dialogConfig);
  }
}
