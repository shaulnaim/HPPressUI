import { Observer, Subscription, Observable } from 'rxjs';
import { filter, tap, share } from 'rxjs/operators';
import * as _ from 'lodash';

import { LoggerService, RestService, NotificationService } from 'hp-services';

import { IContent } from './common-interfaces';
// TODO: this is the OLD design (exist here due to use in planner).
// TODO: will be refactor to use no-models architecture for keyable. like done in press-state
export abstract class ServiceBase {
  public contentObservable$: Observable<any>;
  private _onUIDataContentSubscription: Subscription;
  private _uiDataContentObservable$: Observable<IContent>;
  private _observablesByKeys: Map<any[], Observable<IContent>> = new Map<any[], Observable<IContent>>();

  constructor(
    protected resourceName: string,
    private notificationService: NotificationService,
    protected logger: LoggerService,
    protected restService: RestService
  ) {
    this.logger.debug('creating ' + this.resourceName);
  }

  protected getObservableSingle(): Observable<IContent> {
    this.logger.debug('get observ ' + this.resourceName);
    if (this._uiDataContentObservable$ === undefined) {
      this._uiDataContentObservable$ = new Observable((observer: Observer<IContent>) => {
        this.logger.debug('Creating observable for resource ' + this.resourceName);
        let subscriptionId: string;
        this.getSubscriptionId().then((id) => {
          this.logger.debug('Requesting UI data for resource ' + this.resourceName);
          subscriptionId = id;
          this.sendSubscribeToServer(subscriptionId);
        });

        this._onUIDataContentSubscription = this.notificationService.onUIData$
          .pipe(
            filter((serverMessage) => serverMessage.SubscriptionId === subscriptionId),
            tap(() => {
              this.logger.debug('Got UI data for resource ' + this.resourceName);
            })
          )
          .subscribe((serverMessage) => {
            observer.next(serverMessage.Content);
          });

        return () => {
          this._onUIDataContentSubscription.unsubscribe();
          this.sendUnsubscribeToServer(subscriptionId);
          this._uiDataContentObservable$ = undefined;
        };
      }).pipe(share());
    }
    return this._uiDataContentObservable$;
  }

  protected getObservableAll(): Observable<IContent> {
    if (this._uiDataContentObservable$ === undefined) {
      let subscriptionId: string;
      this.getSubscriptionId().then((id) => {
        subscriptionId = id;
        this.sendSubscribeAllToServer(subscriptionId);
      });

      this._uiDataContentObservable$ = new Observable((observer: Observer<IContent>) => {
        this._onUIDataContentSubscription = this.notificationService.onUIData$
          .pipe(
            filter((serverMessage) => serverMessage.SubscriptionId === subscriptionId),

            tap(() => {
              this.logger.debug('Got UI data for resource ' + this.resourceName);
            })
          )
          .subscribe((serverMessage) => {
            observer.next(serverMessage.Content);
          });

        return () => {
          this._onUIDataContentSubscription.unsubscribe();
          this.sendUnsubscribeToServer(subscriptionId);
          this._uiDataContentObservable$ = undefined;
        };
      }).pipe(share());
    }
    return this._uiDataContentObservable$;
  }

  protected getObservableMany<TKey>(keys: TKey[]): Observable<IContent> {
    let keysArray = this.getKeysArrayIfExists(keys);

    if (keysArray === undefined) {
      keysArray = keys;

      let subscriptionId: string;
      this.getSubscriptionId().then((id) => {
        subscriptionId = id;
        this.sendSubscribeManyToServer(subscriptionId, keysArray);
      });

      const observable = new Observable((observer: Observer<IContent>) => {
        const onUIDataContentSubscriptionKeyable = this.notificationService.onUIData$
          .pipe(
            filter((serverMessage) => serverMessage.SubscriptionId === subscriptionId),
            tap(() => {
              this.logger.debug('Got UI data for resource ' + this.resourceName);
            })
          )
          .subscribe((serverMessage) => {
            observer.next(serverMessage.Content);
          });

        return () => {
          onUIDataContentSubscriptionKeyable.unsubscribe();
          this.sendUnsubscribeToServer(subscriptionId);
          this._observablesByKeys.delete(keysArray);
        };
      }).pipe(share());

      this._observablesByKeys.set(keysArray, observable);
    }

    return this._observablesByKeys.get(keysArray);
  }

  sendSubscribeToServer(subscriptionID: string) {
    this.logger.debug(`_sendSubscribeToServer called for resource ${this.resourceName}`);
    this.restService
      .put(this.resourceName + `/subscribe/${subscriptionID}`)
      .then(() => this.logger.debug(`Got response from subscribe to ${this.resourceName}`));
  }

  protected sendSubscribeAllToServer(subscriptionID: string) {
    this.logger.debug(`_sendSubscribeAllToServer called for resource ${this.resourceName}`);
    this.restService
      .put(this.resourceName + `/subscribe-all/${subscriptionID}`)
      .then(() => this.logger.debug(`Got response from subscribe to ${this.resourceName}`));
  }

  protected sendSubscribeManyToServer(subscriptionID: string, keys: any[]) {
    this.logger.debug(
      `_sendSubscribeManyToServer called for resource ${this.resourceName} with keys ${
        keys ? keys.toString() : null
      }`
    );
    this.restService
      .put(this.resourceName + `/subscribe-many/${subscriptionID}`, keys)
      .then(() => this.logger.debug(`Got response from subscribe to ${this.resourceName}`));
  }

  protected sendUnsubscribeToServer(subscriptionID: string) {
    this.restService
      .put(this.resourceName + `/unsubscribe/${subscriptionID}`)
      .then((responseData) => responseData);
  }

  private getSubscriptionId() {
    return this.restService.get(`Guid`);
  }

  private getKeysArrayIfExists<TKey>(keys: TKey[]): any {
    for (const keysArray of Array.from(this._observablesByKeys.keys())) {
      if (keys.length !== keysArray.length) continue;

      let itemExistsCount = 0;
      /* tslint:disable:prefer-for-of */
      for (let i = 0; i < keys.length; i++) {
        for (let j = 0; j < keysArray.length; j++) {
          if (_.isEqual(keys[i], keysArray[j])) itemExistsCount++;
        }
      }
      if (itemExistsCount === keys.length) return keysArray;
    }

    return undefined;
  }
}
