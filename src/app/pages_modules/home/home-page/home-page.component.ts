import { Component } from '@angular/core';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  isShowOffBg = true;
  constructor() {}
  changeToOffBg(isOff: boolean) {
    this.isShowOffBg = isOff;
  }
}
