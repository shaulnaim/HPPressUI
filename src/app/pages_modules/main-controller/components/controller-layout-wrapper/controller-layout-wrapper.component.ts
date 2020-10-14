import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'controller-layout-wrapper',
  templateUrl: './controller-layout-wrapper.component.html',
  styleUrls: ['./controller-layout-wrapper.component.scss']
})
export class ControllerLayoutWrapperComponent implements OnInit {
  @Input() isButtonsLayer = false;
  constructor() {}

  ngOnInit(): void {}
}
