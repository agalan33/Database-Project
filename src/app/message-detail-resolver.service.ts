import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
}                     from '@angular/router'
import { Observable, of, EMPTY }  from 'rxjs';
import { mergeMap, take }         from 'rxjs/operators';

import { MessageService } from './message.service';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class MessageDetailResolverService implements Resolve<Message>{

  constructor(private ms: MessageService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Observable<Message> | Observable<never> {
    let id = +route.paramMap.get('mid');

    return this.ms.getMessage(id).pipe(
      take(1),
      mergeMap(message => {
        if(message) {
          return of(message);
        }
        else{
          return EMPTY;
        }
      })
    )
  }
}
