import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { PatternServiceBase } from './pattern-service-base';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { NotificationService, LoggerService, RestService, IServerMessage, SERVER_MESSAGE_TYPES } from 'hp-services';
import { fakeAsync, tick } from '@angular/core/testing';

@Injectable()
class TestedPatternService extends PatternServiceBase<string> {
  constructor(notificationService: NotificationService, logger: LoggerService, restService: RestService) {
    super('TestedEntity', notificationService, logger, restService);
  }
}

describe('PatternBaseService', () => {
  let spyOnRESTget: jasmine.Spy;
  let spyOnRESTput: jasmine.Spy;
  let spectator: SpectatorService<TestedPatternService>;
  const TESTED_GUID = '111-222-333-444';
  const TESTED_FIRST_MESSAGE = 'First notification';
  const TESTED_SECOND_MESSAGE = 'second notification';
  const TESTED_RESOURCE_NAME = 'TestedEntity';

  let createService = createServiceFactory({
    service: TestedPatternService,
    mocks: [NotificationService, LoggerService, RestService]
  });

  const firstMessage = {
    Type: SERVER_MESSAGE_TYPES.ResourceNotification,
    ResourceName: TESTED_RESOURCE_NAME,
    SubscriptionId: TESTED_GUID,
    Content: { Data: TESTED_FIRST_MESSAGE }
  } as IServerMessage;

  const secondMessage = {
    Type: SERVER_MESSAGE_TYPES.ResourceNotification,
    ResourceName: TESTED_RESOURCE_NAME,
    SubscriptionId: TESTED_GUID,
    Content: { Data: TESTED_SECOND_MESSAGE }
  } as IServerMessage;

  beforeEach(() => {
    spectator = createService();
    const mockRestService = spectator.get(RestService);

    spyOnRESTget = mockRestService.get.and.returnValue(
      new Promise((resolutionFunc, rejectionFunc) => {
        resolutionFunc(TESTED_GUID);
      })
    );

    spyOnRESTput = mockRestService.put.and.returnValue(
      new Promise((resolutionFunc, rejectionFunc) => {
        resolutionFunc(null);
      })
    );
  });

  it('will call REST with getGUID and subscribe on notification', fakeAsync(() => {
    const mockNotificationService = spectator.get(NotificationService);
    mockNotificationService.onUIData$ = new Subject<IServerMessage>();
    spectator.service.observable$.subscribe();
    expect(spyOnRESTget).toHaveBeenCalledWith('Guid');
    tick();
    expect(spyOnRESTput).toHaveBeenCalledWith(`${TESTED_RESOURCE_NAME}/subscribe/${TESTED_GUID}`);
  }));

  it('REST server should be called only once for all subscribes and unsubscribe REST only when no-subscribers', fakeAsync(() => {
    const mockNotificationService = spectator.get(NotificationService);
    mockNotificationService.onUIData$ = new Subject<IServerMessage>();
    let recievedData: string;
    let firstSubscription = spectator.service.observable$.subscribe((data: string) => {
      recievedData = data;
    });
    tick();
    (mockNotificationService.onUIData$ as Subject<IServerMessage>).next(firstMessage);
    expect(recievedData).toEqual(TESTED_FIRST_MESSAGE);
    (mockNotificationService.onUIData$ as Subject<IServerMessage>).next(secondMessage);
    expect(recievedData).toEqual(TESTED_SECOND_MESSAGE);

    let secondSubscription = spectator.service.observable$.subscribe((data: string) => {
      expect(data).toEqual(TESTED_SECOND_MESSAGE);
    });
    expect(spyOnRESTget).toHaveBeenCalledTimes(1);
    tick();
    secondSubscription.unsubscribe();
    expect(spyOnRESTput).not.toHaveBeenCalledWith(`${TESTED_RESOURCE_NAME}/unsubscribe/${TESTED_GUID}`);
    firstSubscription.unsubscribe();
    expect(spyOnRESTput).toHaveBeenCalledWith(`${TESTED_RESOURCE_NAME}/unsubscribe/${TESTED_GUID}`);
  }));

  it('subscribe after unsubscribe', fakeAsync(() => {
    const mockNotificationService = spectator.get(NotificationService);
    mockNotificationService.onUIData$ = new Subject<IServerMessage>();
    let subscription = spectator.service.observable$.subscribe();
    tick();
    subscription.unsubscribe();
    spectator.service.observable$.subscribe((data: string) => {});
    tick();
    expect(spyOnRESTget).toHaveBeenCalledTimes(2);
  }));
});
