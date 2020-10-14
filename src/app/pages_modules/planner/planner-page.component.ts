import { Component, Input } from '@angular/core';

@Component({
  selector: 'planner-page',
  templateUrl: './planner-page.component.html',
  styleUrls: ['./planner-page.component.scss']
})
export class PlannerPageComponent {
  @Input() isSplittedScreen = false;
  constructor() {}
}
