import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'inspection-page',
  templateUrl: './inspection-page.component.html',
  styleUrls: ['./inspection-page.component.scss']
})
export class InspectionPageComponent implements OnInit {
  @Input() isSplittedScreen = false;
  constructor() {}

  ngOnInit() {}
}
