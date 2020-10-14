import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainControllerComponent } from './main-controller.component';
import { LottieModule } from 'ngx-lottie';
import { ControllerButtonsComponent } from './components/controller-buttons/controller-buttons.component';
import { SubMenuButtonsComponent } from './components/sub-menu-buttons/sub-menu-buttons.component';
import { StateMenuButtonsComponent } from './components/state-menu-buttons/state-menu-buttons.component';
import { ControllerLottieComponent } from './components/controller-lottie/controller-lottie.component';
import { ControllerLayoutWrapperComponent } from './components/controller-layout-wrapper/controller-layout-wrapper.component';
//  we need a separate function as it's required
// by the AOT compiler.
export function playerFactory() {
  return import('lottie-web');
}
@NgModule({
  declarations: [
    MainControllerComponent,
    ControllerButtonsComponent,
    SubMenuButtonsComponent,
    StateMenuButtonsComponent,
    ControllerLottieComponent,
    ControllerLayoutWrapperComponent
  ],
  imports: [CommonModule, LottieModule.forRoot({ player: playerFactory, useCache: true })],
  exports: [MainControllerComponent, ControllerButtonsComponent, ControllerLottieComponent, ControllerLayoutWrapperComponent]
})
export class MainControllerModule {}
