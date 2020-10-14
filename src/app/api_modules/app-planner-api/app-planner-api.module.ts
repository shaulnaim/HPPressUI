import { NgModule } from '@angular/core';
import { PlannerSlotEntityModel } from './planner-slot/planner-slot-entity.model';
import { PlannerSlotEntityService } from './planner-slot/planner-slot-entity.service';

@NgModule({
  providers: [PlannerSlotEntityModel, PlannerSlotEntityService]
})
export class AppPlannerApiModule {}
