import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Message } from './message';
import { MESSAGES } from './mock-messages';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

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

  getNumLikes(id: number): Observable<int> {
    return this.http.get<int>('/DbProject/messages/' + id + '/likestotal');
  }

  getNumDislikes(id: number): Observable<int> {
    return this.http.get<int>('/DbProject/messages/' + id +'/dislikestotal');
  }

  getLikes(id: number): Observable<any[]> {
    return of(MESSAGES);
  }

  // WIP
  getDislikes(id: number): Observable<any[]> {
    return of(MESSAGES);
  }
}
