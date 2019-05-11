import { Component, OnInit } from '@angular/core';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../classes/contact.type';
import { NavBarService } from '../nav-bar/nav-bar.service';
import { User } from '../classes/user.type';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
  public contacts: Contact[] = [];
  public usr: User;
  public filtered = [];
  public headers = ['ufirst_name', 'ulast_name', 'uphone', 'uemail'];
  public usersURL = 'http://127.0.0.1:5000/DbProject/users';
  private contactsURL = 'http://127.0.0.1:5000/DbProject/users/';
  public users = [];
  constructor(public dialogRef: MatDialogRef<AddContactComponent>, private httpClient: HttpClient, private navBarService: NavBarService, private  snackBar: MatSnackBar) { }

  ngOnInit() {
    this.navBarService.isLogged();
    this.navBarService.changeLogin.subscribe(data => {
      if (data) {
        this.usr = this.navBarService.getCurrentUser();
        const url = this.contactsURL.concat(String(this.usr.uid));
        const finishedURL = url.concat('/contacts');
        this.httpClient.get<Contact[]>(finishedURL).subscribe(friends => {
          this.contacts = friends;
          console.log(this.contacts);
        });
        this.httpClient.get<User[]>(this.usersURL).subscribe(users => {
          this.users = users;
          for (let u = 0; u < this.users.length; u++) {
            if (this.users[u].uid === this.usr.uid) {
              this.users.splice(u, 1);
            }
          }
          this.filtered = this.users;
        });
      }
    });
  }
  searchUser(name: string) {
    if (name === '') {
      this.users = this.filtered;
    } else {
      this.users = this.filtered.filter(friend => friend.firstname.toLocaleLowerCase().includes(name.toLocaleLowerCase()));
    }
  }
  addContact(uid: string) {
    let isFriend = false;
    const id = Number(uid);
    for (let i = 0; i < this.contacts.length; i++) {
      if (id === this.contacts[i].contactid) {
        console.log('wee');
        isFriend = true;
        break;
      }
    }
    if (isFriend) {
      this.snackBar.open('User is already a contact', '', {
        duration: 5000
      });
    } else {
      const url = 'http://127.0.0.1:5000/DbProject/users/';
      const cURL = url.concat(String(this.usr.uid));
      const lURL = cURL.concat('/contacts');
      console.log(lURL);
      this.httpClient.post(lURL, {
        'ownerid': this.usr.uid,
        'contactid': id
      }).subscribe(data => {
        console.log(data);
        if (data['Contactid']) {
          window.location.reload();
        }
      });
    }
  }
}
