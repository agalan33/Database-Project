import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Message } from './classes/message';
import { MESSAGES } from './mock-messages';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Reaction} from './classes/reaction.type';
import {NewMessage} from './classes/newMessage';
import {Chats} from './classes/chats.type';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  getMessages(cid: number): Observable<Message[]> {
    return this.http.get<Message[]>('DbProject/users/1/chats/' + cid + '/messages');
  }

  getMessage(id: number): Observable<Message> {
    return this.http.get<Message>('DbProject/users/1/chats/1/messages/' + id);
  }

  sendMessage(uid: number, cid: number, message: NewMessage): Observable<Message> {
    let httpParams = new HttpParams();
    Object.keys(message).forEach(key => {
      httpParams = httpParams.append(key, message[key]);
    });
    return this.http.post<Message>('DbProject/users/' + uid + '/chats/' + cid + '/messages', httpParams);
  }

  getReplies(id: number): Observable<Message[]> {
    return this.http.get<Message[]>('DbProject/users/1/chats/1/messages/' + id + '/replies');
  }

  getNumLikes(id: number): Observable<number> {
    return this.http.get<number>('/DbProject/messages/' + id + '/likestotal');
  }

  getNumDislikes(id: number): Observable<number> {
    return this.http.get<number>('/DbProject/messages/' + id + '/dislikestotal');
  }

  getLikes(id: number): Observable<Reaction[]> {
    return this.http.get<Reaction[]>('/DbProject/users/1/chats/1/messages/' + id + '/likes/users');
  }

  // WIP
  getDislikes(id: number): Observable<Reaction[]> {
    return this.http.get<Reaction[]>('/DbProject/users/1/chats/1/messages/' + id + '/dislikes/users');
  }

  newChat(uid: number, cname: string) {
    const chat = {
      'cname': cname
    };
    let httpParams = new HttpParams();
    Object.keys(chat).forEach(key => {
      httpParams = httpParams.append(key, chat[key]);
    });
    return this.http.post<Chats>('/DbProject/users/' + uid + '/chats', httpParams);
  }
}
