import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../classes/contact.type';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
  public contacts = [];
  public filtered = [];
  public headers = ['ufirst_name', 'ulast_name', 'uphone', 'uemail'];
  public usersURL = '';
  constructor(public dialogRef: MatDialogRef<AddContactComponent>, private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get<Contact[]>(this.usersURL).subscribe(data => {
      this.contacts = data;
    });
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
