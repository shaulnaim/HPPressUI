import { Subscription, Observer, Observable } from 'rxjs';
import { LoggerService } from 'hp-services';
import { ServiceBase } from './service-base';
import { map } from 'rxjs/operators';

export abstract class PatternModelBase<TPattern> {
  private _subscription: Subscription;
  private _pattern: TPattern = null;
  private _observers: Observer<TPattern>[] = [];
  public observable$: Observable<TPattern>;

  constructor(protected service: ServiceBase, protected logger: LoggerService ) {
   this.observable$ = new Observable<TPattern>((observer: Observer<TPattern>) => {
     this._observers.push(observer);
     if (this._observers.length === 1) {
       this._subscription = this.service.contentObservable$
         .pipe(
           map((wrapper: any) => {
             this._pattern = wrapper.Data;
             return this._pattern;
           })
         )
         .subscribe(
           (data) => this._observers.forEach((obs) => obs.next(data)),
           (error) => this._observers.forEach((obs) => obs.error(error)),
           () => this._observers.forEach((obs) => obs.complete())
         );
     }
     if (this._pattern !== null) {
       observer.next(this._pattern); // send last updated array
     }
     return () => {
       let index: number = this._observers.findIndex((element) => element === observer);
       this._observers.splice(index, 1);
       if (this._observers.length === 0) {
         this._subscription.unsubscribe();
         this._pattern = null; // clear pattern when unsubscribed
       }
     };
   });

    }
}
