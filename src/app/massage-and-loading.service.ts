import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MassageAndLoadingService {
  loading$: Subject<boolean> = new Subject();
  messages$: Subject<string> = new Subject();
  constructor() { }

  startLoading(): any {
    this.loading$.next(true);
  }

  stopLoading(): any {
    this.loading$.next(false);
  }

  sendMessage(message: string): any {
    this.messages$.next(message);
  }

  // clearMessages(): any {
  //   this.messages$.next();
  // }

  getMessage(): Observable<any> {
    return this.messages$.asObservable();
  }
}
