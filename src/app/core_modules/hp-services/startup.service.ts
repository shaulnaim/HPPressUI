import { Injectable } from '@angular/core';

import { Utils } from './utils.service';
import { NotificationService } from './notification.service';

@Injectable()
export class StartupService {
  constructor(private notificationService: NotificationService) {}

  load(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.notificationService.onClientConnected$.subscribe((msg) => {
        Utils.clientId = msg.ClientID;
        resolve(true);
      });
    });
  }
}
