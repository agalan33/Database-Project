import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../classes/contact.type';
import { MatDialog, MatDialogConfig} from '@angular/material';
import {AddContactComponent} from '../add-contact/add-contact.component';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  public contacts = [];
  public filtered = [];
  public headers = ['username', 'ufirst_name', 'ulast_name', 'uphone', 'uemail'];
  private contactsURL = 'http://127.0.0.1:5000/DbProject/users/1/contacts';
  private favoritesURL = 'http://127.0.0.1:5000/DbProject/users/1/contacts/favorites';

  constructor(private httpClient: HttpClient, private dialog: MatDialog) { }

  ngOnInit() {
    this.getAllContacts();
  }
  getSelectedTab(event: any) {
    console.log(event.label);
  }
  getAllContacts() {
    this.httpClient.get<Contact[]>(this.contactsURL).subscribe(data => {
      this.contacts = data;
      this.filtered = data;
      console.log(data);
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
  getAllFavoritesContacts() {
    this.httpClient.get<Contact[]>(this.favoritesURL).subscribe(data => {
      this.contacts = data;
    });
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '400px';
    dialogConfig.width = '600px';
    this.dialog.open(AddContactComponent, dialogConfig);
  }

}
