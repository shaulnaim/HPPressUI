import { Component } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { MainPressControlEntity, MainPressControlState } from 'app-press-control-api';
import { DestroyService } from 'hp-services';
import { ControllerActionStates } from '../../controller-types';
import { ControllerStoreService } from '../../services/controller-store.service';

@Component({
  selector: 'controller-buttons',
  templateUrl: './controller-buttons.component.html',
  styleUrls: ['./controller-buttons.component.scss']
})
export class ControllerButtonsComponent {
  mainPressControlState = MainPressControlState;
  controllerActionState: ControllerActionStates;
  currentLottieState: MainPressControlState;
  controllerState: MainPressControlEntity;
  isShowStateMenu = false;
  isShowMainButtons = false;
  isShowPrintBtn = true;
  isShowPauseIcon = true;
  isAnimatingOpenStateMenu = false;
  isPrintBtnPresssed = false;
  isPausePresssed = false;
  isPaused = false;
  isMsgBtnPresssed = false;
  isStopBtnPresssed = false;
  isStateAvailable = true;
  isTransitionToOff = false;

  // TODO: remove comment when specs for off transition will be set
  // TODO: i18n
  /* switchToReadyText = 'Switch to Ready';
   switchToStandbyText = 'Switch to StandBy';*/

  constructor(private controllerStoreService: ControllerStoreService, destroy$: DestroyService) {
    this.controllerStoreService.lottieStates$.pipe(takeUntil(destroy$)).subscribe((val: MainPressControlState) => {
      this.isShowMainButtons = this.getIsShowMainButtons(val);
      if (!this.isShowMainButtons) this.currentLottieState = val;
      if (val === this.mainPressControlState.Ready) {
        this.isShowPrintBtn = true;
        this.isPaused = false;
      }
    });
    this.controllerStoreService.controllerEntityState$.pipe(takeUntil(destroy$)).subscribe((val: MainPressControlEntity) => {
      if (val) {
        this.controllerState = val;
        this.isShowStateMenu = false;
        this.isStateAvailable = this.getIsStateMenuAvailable(val);
      }
    });
  }

  getIsShowMainButtons(val: MainPressControlState): boolean {
    this.isTransitionToOff = false;
    let { Off, OffToReady, StandbyToOff, OffToStandby, OffReadyToStandby, OffStandbyToReady, PowerDisable } = this.mainPressControlState;
    if (
      val === Off ||
      val === OffToReady ||
      val === OffToStandby ||
      val === OffReadyToStandby ||
      val === OffStandbyToReady ||
      val === PowerDisable
    ) {
      return false;
    } else if (val === StandbyToOff) {
      this.isTransitionToOff = true;
      return false;
    } else {
      return true;
    }
  }

  /**
   * disable State menu on transitions states
   * and when all its inner actions are not availabe
   */
  getIsStateMenuAvailable(val: MainPressControlEntity): boolean {
    let { IsGetReadyAvailable, IsGoToOffAvailable, IsGoToStandbyAvailable } = val;
    let currentState = val.CurrentPressState;
    if (
      currentState === MainPressControlState.StandbyToReady ||
      currentState === MainPressControlState.StandbyToOff ||
      currentState === MainPressControlState.ReadyToOff ||
      currentState === MainPressControlState.ServiceToStandby ||
      currentState === MainPressControlState.GoToService ||
      currentState === MainPressControlState.PrePrint ||
      currentState === MainPressControlState.GoToStandby ||
      currentState === MainPressControlState.PostPrint ||
      (!IsGetReadyAvailable && !IsGoToOffAvailable && !IsGoToStandbyAvailable)
    ) {
      return false;
    } else {
      return true;
    }
  }

  toggleOnStateBtnPressed(): void {
    if (!this.isStateAvailable) return;
    if (!this.isAnimatingOpenStateMenu) this.isShowStateMenu = !this.isShowStateMenu;
  }

  OnPrintBtnPressedDown(): void {
    if (!this.controllerState.IsPrintAvailable) return;
    this.isPrintBtnPresssed = true;
  }

  OnPrintBtnPressedUP(): void {
    if (!this.controllerState.IsPrintAvailable) return;
    this.isPrintBtnPresssed = false;
    this.isShowPrintBtn = false;
    this.isShowPauseIcon = true;
    this.controllerStoreService.controllerActionState = ControllerActionStates.startPrint;
  }

  toggleOnMsgeBtnPressed(): void {
    if (!this.isShowStateMenu) {
      this.isMsgBtnPresssed = true;
    }
  }

  onMsgBtnPressedUp(): void {
    if (!this.isShowStateMenu) {
      this.isMsgBtnPresssed = false;
    }
  }

  onStopBtnPressedDown(): void {
    if (!this.controllerState.IsStopAvailable) return;
    this.isStopBtnPresssed = true;
    this.controllerStoreService.controllerActionState = ControllerActionStates.stopPrint;
  }

  onStopBtnPressedUp(): void {
    if (!this.controllerState.IsStopAvailable) return;
    this.isStopBtnPresssed = false;
    this.isShowPrintBtn = true;
    this.isPaused = false;
  }

  onPauseBtnPressedDown(): void {
    if (!this.controllerState.IsPauseAvailable) return;
    this.isPausePresssed = true;
  }

  onPauseBtnPressedUp(): void {
    if (!this.controllerState.IsPauseAvailable) return;
    this.isPaused = !this.isPaused;
    this.isPausePresssed = false;
    if (this.isPaused) {
      this.isShowPauseIcon = false;
      this.controllerStoreService.controllerActionState = ControllerActionStates.pausePrint;
    } else {
      this.isShowPauseIcon = true;
      this.controllerStoreService.controllerActionState = ControllerActionStates.startPrint;
    }
  }

  updateIsAnimating(isAnimating: boolean): void {
    this.isAnimatingOpenStateMenu = isAnimating;
  }

  // TODO: uncomment onOffBtnPressed() when specs for off transition will be set
  onOffBtnPressed(): void {
    switch (this.currentLottieState) {
      case this.mainPressControlState.Off:
        this.isShowMainButtons = false;
        this.controllerStoreService.controllerActionState = ControllerActionStates.offToStandby;
        break;
      /*
      case this.mainPressControlState.OffToStandby:
         this.controllerStoreService.controllerActionState = ControllerActionStates.OffToStandby;
        break;
      case this.mainPressControlState.OffToReady:
         this.controllerStoreService.controllerActionState = ControllerActionStates.OffReadyToStandby;
        break;
      case this.mainPressControlState.OffReadyToStandby:
         this.controllerStoreService.controllerActionState = ControllerActionStates.OffStandbyToReady;
        break;
      case this.mainPressControlState.OffStandbyToReady:
         this.controllerStoreService.controllerActionState = ControllerActionStates.OffReadyToStandby;
        break;
      */
    }
  }
}
