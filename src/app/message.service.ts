import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Message } from './message';
import { MESSAGES } from './mock-messages';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  getMessages(): Observable<Message[]> {
    return of(MESSAGES);
  }

  getMessage(id: number): Observable<Message> {
    return of(MESSAGES.find(element => element.id === id));
  }

  getReplies(id: number): Observable<Message[]> {
    return of(MESSAGES);
  }
}
