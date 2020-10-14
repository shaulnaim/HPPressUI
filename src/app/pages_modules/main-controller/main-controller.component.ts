import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { MainPressControlEntity, MainPressControlEntityService, MainPressControlState } from 'app-press-control-api';
import { DestroyService } from 'hp-services';
import { Animations } from './controller-animations';
import { ControllerStoreService } from './services/controller-store.service';
import { ControllerActionStates } from './controller-types';
import { LoggerService } from 'hp-services';

@Component({
  selector: 'main-controller',
  templateUrl: './main-controller.component.html',
  styleUrls: ['./main-controller.component.scss'],
  animations: [Animations.fadeIn]
})
export class MainControllerComponent implements OnInit {
  @Output() switchToDarkBackground = new EventEmitter<boolean>();
  controllerState: MainPressControlEntity;
  previousControllerState: MainPressControlState;
  mainPressControlState = MainPressControlState;
  isShowSubMenu = false;
  isAnimatingOpenSubMenu = false;
  constructor(
    logger: LoggerService,
    private controllerStoreService: ControllerStoreService,
    private mainPressControlEntityService: MainPressControlEntityService,
    destroy$: DestroyService
  ) {
    this.mainPressControlEntityService.observable$.pipe(takeUntil(destroy$)).subscribe((val) => {
      this.previousControllerState = this.controllerStoreService?.controllerEntityState?.CurrentPressState;
      this.controllerStoreService.controllerEntityState = val;
      this.changeBgOnOff(val.CurrentPressState);
      this.setLottieStateByAPI(val.CurrentPressState);
    });

    this.controllerStoreService.controllerActionStates$.pipe(takeUntil(destroy$)).subscribe((val: ControllerActionStates) => {
      if (val) {
        logger.debug(`ACTION TRIGGERED: ${val}`);
        switch (val) {
          case ControllerActionStates.getReady:
            this.setLottieStateByUserAction(MainPressControlState.Ready);
            this.mainPressControlEntityService.getReady();
            break;
          case ControllerActionStates.goToOff:
            this.setLottieStateByUserAction(MainPressControlState.Off);
            this.mainPressControlEntityService.goToOff();
            break;
          case ControllerActionStates.goToService:
            this.setLottieStateByUserAction(MainPressControlState.GoToService);
            this.mainPressControlEntityService.goToService();
            break;
          case ControllerActionStates.goToStandby:
            this.setLottieStateByUserAction(MainPressControlState.Standby);
            this.mainPressControlEntityService.goToStandby();
            break;
          case ControllerActionStates.pausePrint:
            this.setLottieStateByUserAction(MainPressControlState.Pause);
            this.mainPressControlEntityService.pausePrint();
            break;
          case ControllerActionStates.offToStandby:
            this.setLottieStateByUserAction(MainPressControlState.OffToStandby);
            this.mainPressControlEntityService.goToStandby();
            break;
          case ControllerActionStates.shutdown:
            this.mainPressControlEntityService.shutdown();
            break;
          case ControllerActionStates.startPrint:
            this.setLottieStateByUserAction(MainPressControlState.Print);
            this.mainPressControlEntityService.startPrint();
            break;
          case ControllerActionStates.stopPrint:
            this.setLottieStateByUserAction(MainPressControlState.PrePrint);
            this.mainPressControlEntityService.stopPrint();
            break;
          case ControllerActionStates.restart:
            this.mainPressControlEntityService.restart();
            break;
        }
      }
    });
  }

  changeBgOnOff(currentPressState: MainPressControlState) {
    if (
      currentPressState === MainPressControlState.Off ||
      currentPressState === MainPressControlState.OffToStandby ||
      currentPressState === MainPressControlState.PowerDisable ||
      currentPressState === MainPressControlState.ReadyToOff ||
      currentPressState === MainPressControlState.StandbyToOff
    ) {
      this.switchToDarkBackground.emit(true);
    } else {
      this.switchToDarkBackground.emit(false);
    }
  }

  setLottieStateByUserAction(currentPressState: MainPressControlState) {
    this.previousControllerState = this.controllerStoreService.controllerEntityState.CurrentPressState;
    if (this.previousControllerState === currentPressState) return;
    switch (currentPressState) {
      case MainPressControlState.Off:
        if (this.previousControllerState === MainPressControlState.Ready) {
          this.controllerStoreService.lottieState = MainPressControlState.ReadyToOff;
        } else if (this.previousControllerState === MainPressControlState.Standby) {
          this.controllerStoreService.lottieState = MainPressControlState.StandbyToOff;
        }
        break;
      case MainPressControlState.Standby:
        if (this.previousControllerState === MainPressControlState.Ready) {
          this.controllerStoreService.lottieState = MainPressControlState.GoToStandby;
        }
        break;
      case MainPressControlState.Ready:
        if (this.previousControllerState === MainPressControlState.Standby) {
          this.controllerStoreService.lottieState = MainPressControlState.StandbyToReady;
        }
        break;
      case MainPressControlState.Print:
        if (this.previousControllerState === MainPressControlState.Ready) {
          this.controllerStoreService.lottieState = MainPressControlState.PrePrint;
        } else if (this.previousControllerState === MainPressControlState.Pause) {
          this.controllerStoreService.lottieState = MainPressControlState.PostPrint;
        }
        break;
      case MainPressControlState.Pause:
        this.controllerStoreService.lottieState = MainPressControlState.Pause;
        break;
      case MainPressControlState.GoToService:
        this.controllerStoreService.lottieState = MainPressControlState.GoToService;
        break;
      case MainPressControlState.PrePrint:
        this.controllerStoreService.lottieState = MainPressControlState.PrePrint;
        break;
      case MainPressControlState.OffToStandby:
        this.controllerStoreService.lottieState = MainPressControlState.OffToStandby;
        break;
    }
    this.previousControllerState = currentPressState;
  }

  setLottieStateByAPI(currentPressState: MainPressControlState) {
    if (this.previousControllerState === currentPressState) return;
    this.controllerStoreService.lottieState = currentPressState;
  }

  ngOnInit(): void {}

  toggleSubmenu(): void {
    if (!this.isAnimatingOpenSubMenu) this.isShowSubMenu = !this.isShowSubMenu;
  }
  updateIsAnimating(isAnimating: boolean): void {
    this.isAnimatingOpenSubMenu = isAnimating;
  }
}
