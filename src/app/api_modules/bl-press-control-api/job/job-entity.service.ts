import { Injectable } from '@angular/core';

import { IUpdatable, EntityKeyableServiceBase } from 'hp-patterns-base-classes';
import { JobEntity, JobEntityKey } from './job-types';
import { NotificationService, LoggerService, RestService } from 'hp-services';

@Injectable({
  providedIn: 'root'
})
export class JobEntityService extends EntityKeyableServiceBase<JobEntity, JobEntityKey>
  implements IUpdatable<JobEntity, JobEntityKey> {
  public update(entity: JobEntity) {
    return super.updateInternal(entity);
  }
  constructor(
    notificationService: NotificationService,
    protected logger: LoggerService,
    restService: RestService
  ) {
    super('JobEntity', notificationService, logger, restService);
  }
}
