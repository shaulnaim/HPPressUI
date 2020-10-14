import { Component, EventEmitter, Input, Output } from '@angular/core';

import { MainPressControlEntity, MainPressControlState } from 'app-press-control-api';
import { Animations } from '../../controller-animations';
import { MenusButtonPressCssClass, slideAnimationTypes, ControllerActionStates } from '../../controller-types';
import { ControllerStoreService } from '../../services/controller-store.service';
import { takeUntil } from 'rxjs/operators';
import { DestroyService } from 'hp-services';

@Component({
  selector: 'state-menu-buttons',
  templateUrl: './state-menu-buttons.component.html',
  styleUrls: ['./state-menu-buttons.component.scss'],
  animations: [Animations.slide(slideAnimationTypes.DiagonalUpDownRight)]
})
export class StateMenuButtonsComponent {
  @Output() isAnimating = new EventEmitter<boolean>();
  @Input() isShowStateMenu = false;
  @Input() mainPressControlEntity: MainPressControlEntity;
  menuPanelState: MainPressControlState;
  menuButtonsPressedCssClass = MenusButtonPressCssClass;
  controllerState: MainPressControlEntity;
  currentButtonPressed = '';
  isVisibile = false;

  constructor(private controllerStoreService: ControllerStoreService, destroy$: DestroyService) {
    this.controllerStoreService.controllerEntityState$.pipe(takeUntil(destroy$)).subscribe((val) => {
      if (val) {
        this.currentButtonPressed = '';
        this.controllerState = val;
        this.menuPanelState = val.CurrentPressState;
      }
    });
  }

  slideStateMenuStart(event: Event): void {
    this.isAnimating.emit(true);
  }

  slideStateMenuDone(event: Event): void {
    this.isAnimating.emit(false);
  }

  onReadyBtnPressed() {
    this.currentButtonPressed = this.menuButtonsPressedCssClass.ReadyPressed;
    this.controllerStoreService.controllerActionState = ControllerActionStates.getReady;
  }

  onStandbyBtnPressed() {
    this.currentButtonPressed = this.menuButtonsPressedCssClass.StandbyPressed;
    this.controllerStoreService.controllerActionState = ControllerActionStates.goToStandby;
  }
  onStateOffBtnPressed() {
    this.currentButtonPressed = this.menuButtonsPressedCssClass.OffPressed;
    this.controllerStoreService.controllerActionState = ControllerActionStates.goToOff;
  }
}
