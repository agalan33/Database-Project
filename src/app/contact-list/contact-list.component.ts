import { Component, HostBinding, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from '../classes/contact.type';
import {MatDialog, MatDialogConfig, MatSnackBar} from '@angular/material';
import { AddContactComponent } from '../add-contact/add-contact.component';
import { User } from '../classes/user.type';
import { NavBarService} from '../nav-bar/nav-bar.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  public contacts = [];
  public filtered = [];
  public headers = ['username', 'ufirst_name', 'ulast_name', 'uphone', 'uemail', 'delete'];
  private contactsURL = 'http://127.0.0.1:5000/DbProject/users/';
  @HostBinding('class.usr')
  public usr: User;
  constructor(private httpClient: HttpClient, private dialog: MatDialog, private navBarService: NavBarService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.navBarService.isLogged();
    this.navBarService.changeLogin.subscribe(data => {
      if (data) {
        this.usr = this.navBarService.getCurrentUser();
        const url = this.contactsURL.concat(String(this.usr.uid));
        const finishedURL = url.concat('/contacts');
        this.httpClient.get<Contact[]>(finishedURL).subscribe(p => {
          this.contacts = p;
          this.filtered = p;
          console.log(p);
        });
      }
    });
  }
  clearSearch() {
    this.contacts = this.filtered;
  }
  searchContacts(name: string) {
    if (name === '') {
      this.contacts = this.filtered;
    } else {
      this.contacts = this.filtered.filter(contact => contact.ufirst_name.toLocaleLowerCase().includes(name.toLocaleLowerCase()));
    }
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '400px';
    dialogConfig.width = '600px';
    this.dialog.open(AddContactComponent, dialogConfig);
  }
  removeContact(id: number) {
    const url = this.contactsURL.concat(String(this.usr.uid));
    const cURL = url.concat('/contacts');
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: {'ownerid': this.usr.uid, 'contactid': id}
    };
    this.httpClient.delete(cURL, httpOptions).subscribe(data => {
      if (data['Deleted'] = 'Successful') {
        window.location.reload();
      } else {
        this.snackBar.open('Unexpected error', '', {
          duration: 5000
        });
      }
    });
  }
}
