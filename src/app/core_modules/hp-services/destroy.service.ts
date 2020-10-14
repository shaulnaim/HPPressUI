import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class DestroyService extends Observable<void> implements OnDestroy {
  private readonly life$ = new Subject<void>();
  constructor() {
    super((subscriber) => this.life$.subscribe(subscriber));
  }

  ngOnDestroy(): void {
    this.life$.next();
    this.life$.complete();
  }
}
