import { Injectable } from '@angular/core';

import { EntityKeyableModelBase } from 'hp-patterns-base-classes';
import { PlannerSlotEntity, PlannerSlotEntityKey } from './planner-slot-types';
import { PlannerSlotEntityService } from './planner-slot-entity.service';
import { LoggerService } from 'hp-services';

@Injectable()
export class PlannerSlotEntityModel extends EntityKeyableModelBase<PlannerSlotEntity, PlannerSlotEntityKey> {
  constructor(service: PlannerSlotEntityService, protected logger: LoggerService) {
    super(service, logger);
  }
  public update(entity: PlannerSlotEntity): Promise<PlannerSlotEntity> {
    return super.updateInternal(entity);
  }
}
