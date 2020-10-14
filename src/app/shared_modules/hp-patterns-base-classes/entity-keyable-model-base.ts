import { Subscription, Observer, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

import { LoggerService } from 'hp-services';

import { DataNotificationsTypes, IKeyableData, IAddable, IUpdatable, IDeletable, ResourceNotificationMany } from './common-interfaces';
import { EntityKeyableServiceBase } from './entity-keyable-service-base';

export class ObservableData<TEntity> {
  public observable: Observable<TEntity[]>;
  public observers: Observer<TEntity[]>[] = [];
  public list: TEntity[] = [];
  public subscription: Subscription;
}

export abstract class EntityKeyableModelBase<TEntity extends IKeyableData<TKey>, TKey> {
  private _subscriptionForAll: Subscription;
  private _listForAll: TEntity[] = [];
  private _observersForAll: Observer<TEntity[]>[] = [];
  private _observableDataByKeys: Map<TKey[], ObservableData<TEntity>> = new Map<TKey[], ObservableData<TEntity>>();

  constructor(protected service: EntityKeyableServiceBase<TEntity, TKey>, protected logger: LoggerService) {}

  private _listObservableForAll: Observable<TEntity[]> = new Observable((observer: Observer<TEntity[]>) => {
    this._observersForAll.push(observer);
    if (this._observersForAll.length === 1) {
      this._subscriptionForAll = this.getServerListenerForAll().subscribe(
        (data) =>
          this._observersForAll.forEach((obs) => {
            obs.next(data);
          }),
        (error) => this._observersForAll.forEach((obs) => obs.error(error)),
        () => this._observersForAll.forEach((obs) => obs.complete())
      );
    }
    if (this._listForAll.length > 0) {
      observer.next(this._listForAll); // send last updated array
    }

    return () => {
      const index: number = this._observersForAll.findIndex((element) => element === observer);
      this._observersForAll.splice(index, 1);
      if (this._observersForAll.length === 0) {
        this._subscriptionForAll.unsubscribe();
        this._listForAll = []; // clear list when unsubscribed
      }
    };
  });
  private getServerListenerForAll(): Observable<TEntity[]> {
    const tempService: any = this.service;
    const observable: Observable<ResourceNotificationMany<TEntity, TKey>> = tempService.getObservableAll();
    return observable.pipe(
      map((resourceNotification: ResourceNotificationMany<TEntity, TKey>) => {
        switch (resourceNotification.NotificationType) {
          case DataNotificationsTypes.Initial:
            this._listForAll = resourceNotification.Data;
            break;
          case DataNotificationsTypes.Added:
            resourceNotification.Data.forEach((serverElement) => this._listForAll.push(serverElement));
            break;
          case DataNotificationsTypes.Changed:
            resourceNotification.Data.forEach((serverElement) => {
              const index: number = this._listForAll.findIndex((entity: TEntity) => _.isEqual(entity.Key, serverElement.Key));
              if (index !== -1) {
                this._listForAll[index] = serverElement;
              }
            });
            break;
          case DataNotificationsTypes.Deleted:
            resourceNotification.Data.forEach((serverElement) => {
              const index: number = this._listForAll.findIndex((entity: TEntity) => _.isEqual(entity.Key, serverElement.Key));
              if (index !== -1) {
                this._listForAll.splice(index, 1);
              }
            });
            break;
        }
        return [...this._listForAll];
      })
    );
  }

  private getServerListenerForMany(keys: TKey[]): Observable<TEntity[]> {
    const tempService: any = this.service;
    const observable: Observable<ResourceNotificationMany<TEntity, TKey>> = tempService.getObservableMany(keys);
    return observable.pipe(
      map((resourceNotification: ResourceNotificationMany<TEntity, TKey>) => {
        const dataObservable = this._observableDataByKeys.get(keys);
        switch (resourceNotification.NotificationType) {
          case DataNotificationsTypes.Initial:
            dataObservable.list = resourceNotification.Data;
            break;
          case DataNotificationsTypes.Added:
            resourceNotification.Data.forEach((serverElement) => dataObservable.list.push(serverElement));
            break;
          case DataNotificationsTypes.Changed:
            resourceNotification.Data.forEach((serverElement) => {
              const index: number = dataObservable.list.findIndex((entity: TEntity) => _.isEqual(entity.Key, serverElement.Key));
              if (index !== -1) {
                dataObservable.list[index] = serverElement;
              }
            });
            break;
          case DataNotificationsTypes.Deleted:
            resourceNotification.Data.forEach((serverElement) => {
              const index: number = dataObservable.list.findIndex((entity: TEntity) => _.isEqual(entity.Key, serverElement.Key));
              if (index !== -1) {
                dataObservable.list.splice(index, 1);
              }
            });
            break;
        }
        return [...dataObservable.list];
      })
    );
  }

  public getObservable(keys?: TKey[]): Observable<TEntity[]> {
    if (!keys) {
      return this._listObservableForAll;
    }

    let keysArray = this.getKeysArrayIfExists(keys);

    if (keysArray === undefined) {
      keysArray = keys;
      const observableData = new ObservableData<TEntity>();

      this._observableDataByKeys.set(keysArray, observableData);

      observableData.observable = new Observable((observer: Observer<TEntity[]>) => {
        observableData.observers.push(observer);
        if (observableData.observers.length === 1) {
          observableData.subscription = this.getServerListenerForMany(keysArray).subscribe(
            (data) =>
              observableData.observers.forEach((obs) => {
                obs.next(data);
              }),
            (error) => observableData.observers.forEach((obs) => obs.error(error)),
            () => observableData.observers.forEach((obs) => obs.complete())
          );
        }
        if (observableData.list.length > 0) {
          observer.next(observableData.list); // send last updated array
        }
        return () => {
          const index: number = observableData.observers.findIndex((element) => element === observer);
          observableData.observers.splice(index, 1);
          if (observableData.observers.length === 0) {
            observableData.subscription.unsubscribe();
            observableData.list = []; // clear list when unsubscribed
            this._observableDataByKeys.delete(keysArray);
          }
        };
      });
    }

    return this._observableDataByKeys.get(keysArray).observable;
  }

  private getKeysArrayIfExists(keys: TKey[]): any {
    for (const keysArray of Array.from(this._observableDataByKeys.keys())) {
      if (keys.length !== keysArray.length) {
        continue;
      }

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

  protected addInternal(entity: TEntity): Promise<TEntity> {
    const tempService: any = this.service;
    const response: Promise<TEntity> = tempService.add(entity);
    return response;
  }

  protected updateInternal(entity: TEntity): Promise<TEntity> {
    const tempService: any = this.service;
    const response: Promise<TEntity> = tempService.update(entity);
    return response;
  }

  protected deleteInternal(key: TKey): Promise<TEntity> {
    const tempService: any = this.service;
    const response: Promise<TEntity> = tempService.delete(key);
    return response;
  }
}
