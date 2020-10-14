import { Component, OnInit, OnChanges, OnDestroy, Injectable } from '@angular/core';
import { UpdateEntityBaseComponent } from 'hp-components-base-classes';
import { PlannerSlotEntity, PlannerSlotEntityModel, PlannerSlotEntityKey } from 'app-planner-api';

@Component({
  selector: 'job-header',
  templateUrl: './job-header.component.html',
  styleUrls: ['./job-header.component.scss']
})
@Injectable()
export class JobHeaderComponent
  extends UpdateEntityBaseComponent<PlannerSlotEntityModel, PlannerSlotEntity, PlannerSlotEntityKey>
  implements OnInit, OnChanges, OnDestroy {
  legthSvgPath = 'assets/icons/planner/length.svg';
  constructor(plannerSlotEntityModel: PlannerSlotEntityModel) {
    super(plannerSlotEntityModel);
  }
}
