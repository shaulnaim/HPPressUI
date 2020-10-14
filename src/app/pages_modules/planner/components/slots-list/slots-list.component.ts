import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { PlannerSlotEntity, PlannerSlotEntityModel } from 'app-planner-api';

@Component({
  selector: 'slots-list',
  templateUrl: './slots-list.component.html',
  styleUrls: ['./slots-list.component.scss']
})
export class SlotsListComponent implements OnInit {
  slots$: Observable<PlannerSlotEntity[]>;
  slotInksArr = ['green', 'yellow', 'black', 'magenta'];
  selectedSlot = null;
  constructor(private plannerSlotEntityModel: PlannerSlotEntityModel) {}

  slotClick(event, newValue: PlannerSlotEntity) {
    this.selectedSlot = newValue;
  }
  unselectSlot() {
    this.selectedSlot = null;
  }

  ngOnInit() {
    this.slots$ = this.plannerSlotEntityModel.getObservable();
  }
}
