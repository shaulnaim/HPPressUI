import { Observable, Observer, Subscription } from 'rxjs';
import { filter, publishReplay, refCount, tap } from 'rxjs/operators';

import { LoggerService, NotificationService, RestService } from 'hp-services';
import { IPattern } from './pattern-types';
import { ResourceNotification } from './common-interfaces';

export abstract class PatternServiceBase<TPattern extends IPattern> {
  private _onUIDataContentSubscription: Subscription;
  public observable$: Observable<TPattern>;
  private registerationGuid: string;

  constructor(
    private resourceName: string,
    private notificationService: NotificationService,
    protected logger: LoggerService,
    private restService: RestService
  ) {
    this.logger.debug('creating ' + this.resourceName);
    this.createObservable();
  }

  createObservable() {
    this.observable$ = new Observable<TPattern>(this.setObservable.bind(this)).pipe(publishReplay(1), refCount());
  }
  private setObservable(observer: Observer<TPattern>) {
    this.getGUID()
      .then((id) => {
        this.registerationGuid = id;
      })
      .then(() => {
        this._onUIDataContentSubscription = this.notificationService.onUIData$
          .pipe(
            filter((serverMessage) => {
              return serverMessage.SubscriptionId === this.registerationGuid;
            }),
            tap(() => {
              this.logger.debug('Got UI data for resource ' + this.resourceName);
            })
          )
          .subscribe((serverMessage) => {
            this.logger.debug('SERVER MESSAGE:', (serverMessage.Content as ResourceNotification<TPattern>).Data);
            observer.next((serverMessage.Content as ResourceNotification<TPattern>).Data);
          });
        this.sendSubscribeToServer(this.registerationGuid).then(() =>
          this.logger.debug(`Got response from rest subscribe to ${this.resourceName}`)
        );
      });

    return () => {
      this._onUIDataContentSubscription.unsubscribe();
      this.sendUnsubscribeToServer(this.registerationGuid);
    };
  }
  private sendSubscribeToServer(guid: string): Promise<void> {
    this.logger.debug(`sendSubscribeToServer called for resource ${this.resourceName}`);
    return this.restService.put(`${this.resourceName}/subscribe/${guid}`);
  }
  private sendUnsubscribeToServer(guid: string) {
    this.restService.put(`${this.resourceName}/unsubscribe/${guid}`).then((responseData) => responseData);
  }
  private getGUID(): Promise<string> {
    return this.restService.get(`Guid`);
  }

  protected callServer(action: string, pattern: TPattern): Promise<TPattern> {
    return this.restService.put(`${this.resourceName}/${action}`, pattern);
  }

  protected callServerWithoutParams(action: string) {
    this.restService.put(`${this.resourceName}/${action}`);
  }
}
