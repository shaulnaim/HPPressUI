import { Injectable } from '@angular/core';
import { EntityKeyableServiceBase } from 'hp-patterns-base-classes';
import { PlannerSlotEntity, PlannerSlotEntityKey } from './planner-slot-types';
import { NotificationService, LoggerService, RestService } from 'hp-services';

@Injectable({
  providedIn: 'root'
})
export class PlannerSlotEntityService extends EntityKeyableServiceBase<
  PlannerSlotEntity,
  PlannerSlotEntityKey
> {
  constructor(
    notificationService: NotificationService,
    protected logger: LoggerService,
    protected restService: RestService
  ) {
    super('PlannerSlotEntity', notificationService, logger, restService);
  }

  public update(entity: PlannerSlotEntity) {
    return super.updateInternal(entity);
  }
}
