import {Component, HostBinding, OnInit} from '@angular/core';
import {Contact} from '../classes/contact.type';
import {User} from '../classes/user.type';
import {NavBarService} from '../nav-bar/nav-bar.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-add-contact-to-chat',
  templateUrl: './add-contact-to-chat.component.html',
  styleUrls: ['./add-contact-to-chat.component.scss']
})
export class AddContactToChatComponent implements OnInit {
  public contacts = [];
  public members: Contact[] = [];
  public headers = ['username', 'ufirst_name', 'ulast_name', 'uphone', 'uemail'];
  private contactsURL = 'http://127.0.0.1:5000/DbProject/users/';
  private membersURL = 'http://127.0.0.1:5000/DbProject/chats/';
  @HostBinding('class.usr')
  public usr: User;
  constructor(private  navBarService: NavBarService, private httpClient: HttpClient, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.navBarService.isLogged();
    this.navBarService.changeLogin.subscribe(data => {
      if (data) {
        this.usr = this.navBarService.getCurrentUser();
        this.getMembers();
        const url = this.contactsURL.concat(String(this.usr.uid));
        const finishedURL = url.concat('/contacts');
        this.httpClient.get<Contact[]>(finishedURL).subscribe(p => {
          this.contacts = p;
        });
      }
    });
  }
  getMembers() {
    const chatID = this.router.url.charAt(this.router.url.length - 1);
    const url = this.membersURL.concat(String(chatID));
    const finishedURL = url.concat('/users');
    this.httpClient.get<Contact[]>(finishedURL).subscribe( data => {
      this.members = data;
    });
  }
  addContactToChat(id: number) {
    let isMember = false;
    for (let i = 0; i < this.members.length; i++) {
      if (id === this.members[i].contactid) {
        isMember = true;
      }
    }
    if (isMember) {
      this.snackBar.open('Contact is already a member of chat', '', {
        duration: 5000
      });
    } else {
      const chatID = this.router.url.charAt(this.router.url.length - 1);
      const url = this.membersURL.concat(String(chatID));
      const finishedURL = url.concat('/users');
      this.httpClient.post(finishedURL, {
        'uid': id,
        'cid': Number(chatID)
      }).subscribe( data => {
        if (data['CID']) {
          this.snackBar.open('Added Contact to chat.', '', {
            duration: 5000
          });
          window.location.reload();
        }
      });
    }
  }

}
