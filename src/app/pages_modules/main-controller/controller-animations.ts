import { animate, style, transition, trigger } from '@angular/animations';
import { slideAnimationTypes } from './controller-types';

export class Animations {
  public static fadeIn = trigger('fadeIn', [
    transition(':enter', [style({ opacity: 0 }), animate('1s', style({ opacity: 1 }))])
  ]);

  public static slide = (slideType: slideAnimationTypes) => {
    let translateXStart: string;
    let translateXEnd: string;
    let translateYStart: string;
    let translateYEnd: string;

    switch (slideType) {
      case slideAnimationTypes.DownUp:
        translateXStart = '0%';
        translateYStart = '10%';
        translateXEnd = '0%';
        translateYEnd = '0%';
        break;
      case slideAnimationTypes.DiagonalUpDownRight:
        translateXStart = '-10%';
        translateYStart = '-10%';
        translateXEnd = '0%';
        translateYEnd = '0%';
        break;
    }

    return trigger('slide', [
      transition(':enter', [
        style({ transform: `translate(${translateXStart},${translateYStart})`, opacity: 0 }),
        animate(
          '0.5s ease-out',
          style({ transform: `translate(${translateXEnd},${translateYEnd})`, opacity: 1 })
        )
      ]),
      transition(':leave', [
        style({ transform: `translate(${translateXEnd},${translateYEnd})`, opacity: 1 }),
        animate(
          '0.5s ease-in',
          style({ transform: `translate(${translateXStart},${translateYStart})`, opacity: 0 })
        )
      ])
    ]);
  };
}
