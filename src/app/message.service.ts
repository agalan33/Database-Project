import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Message } from './classes/message';
import { MESSAGES } from './mock-messages';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Reaction} from './classes/reaction.type';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>('DbProject/users/1/chats/1/messages');
  }

  getMessage(id: number): Observable<Message> {
    return this.http.get<Message>('DbProject/users/1/chats/1/messages/' + id);
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
}
