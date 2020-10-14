import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { PlannerSlotEntity } from 'app-planner-api';

@Component({
  /* tslint:disable component-selector */
  selector: 'slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.scss']
})
export class SlotComponent implements OnInit {
  @Input() plannerSlotEntity: PlannerSlotEntity;
  @Input() isActive = false;
  @Output() unfocused = new EventEmitter<void>();
  @Input() inksArr: string[];

  constructor() {}

  unfocusSlot() {
    this.unfocused.emit();
  }

  ngOnInit() {}
}
