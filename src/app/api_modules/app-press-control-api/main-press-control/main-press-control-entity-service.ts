import { Injectable } from '@angular/core';

import { EntityServiceBase } from 'hp-patterns-base-classes';

import { MainPressControlEntity } from './main-press-control-types';
import { NotificationService, LoggerService, RestService } from 'hp-services';

@Injectable({
  providedIn: 'root'
})
export class MainPressControlEntityService extends EntityServiceBase<MainPressControlEntity> {
  constructor(notificationService: NotificationService, logger: LoggerService, restService: RestService) {
    super('MainPressControlEntity', notificationService, logger, restService);
  }

  public startPrint() {
    this.callServerWithoutParams('start-print');
  }

  public stopPrint() {
    this.callServerWithoutParams('stop-print');
  }

  public pausePrint() {
    this.callServerWithoutParams('pause-print');
  }

  public getReady() {
    this.callServerWithoutParams('get-ready');
  }

  public goToOff() {
    this.callServerWithoutParams('go-to-off');
  }

  public goToStandby() {
    this.callServerWithoutParams('go-to-standby');
  }

  public goToService() {
    this.callServerWithoutParams('go-to-service');
  }

  public restart() {
    this.callServerWithoutParams('restart');
  }

  public shutdown() {
    this.callServerWithoutParams('shutdown');
  }
}
