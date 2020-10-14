import { Component, OnInit } from '@angular/core';
import { assetsArray } from '../assets';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  imgs = new Array();

  ngOnInit() {
    this.preload(...assetsArray);
  }

  preload(...assets: string[]): void {
    for (let asset of assets) {
      this.imgs.push(new Image());
      this.imgs[this.imgs.length - 1].src = asset;
    }
  }
}
