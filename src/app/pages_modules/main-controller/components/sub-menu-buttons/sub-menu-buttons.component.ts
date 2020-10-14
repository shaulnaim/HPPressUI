import { Component, Input } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { MainPressControlEntity, MainPressControlState } from 'app-press-control-api';
import { DestroyService } from 'hp-services';
import { Animations } from '../../controller-animations';
import { ControllerStoreService } from '../../services/controller-store.service';
import { MenusButtonPressCssClass, slideAnimationTypes, ControllerActionStates } from '../../controller-types';

@Component({
  selector: 'sub-menu-buttons',
  templateUrl: './sub-menu-buttons.component.html',
  styleUrls: ['./sub-menu-buttons.component.scss'],
  animations: [Animations.slide(slideAnimationTypes.DownUp)]
})
export class SubMenuButtonsComponent {
  @Input() isShowSubMenu = false;
  controllerStateEntity: MainPressControlEntity;
  menuPanelState: MainPressControlState;
  menusButtonPressCssClass = MenusButtonPressCssClass;
  currentButtonPressed = '';
  isAnimationInProgress = false;

  constructor(private controllerStoreService: ControllerStoreService, destroy$: DestroyService) {
    this.controllerStoreService.controllerEntityState$.pipe(takeUntil(destroy$)).subscribe((val) => {
      if (val) {
        this.controllerStateEntity = val;
        this.onEntityStateChange();
        this.setMenuPanelTheme(val);
      }
    });
  }

  setMenuPanelTheme(val: MainPressControlEntity) {
    switch (val.CurrentPressState) {
      case MainPressControlState.GoToService:
      case MainPressControlState.GoToStandby:
      case MainPressControlState.StandbyToOff:
      case MainPressControlState.StandbyToReady:
      case MainPressControlState.OffToStandby:
        this.menuPanelState = MainPressControlState.Off;
        break;
      case MainPressControlState.PrePrint:
      case MainPressControlState.PostPrint:
        this.menuPanelState = MainPressControlState.Print;
        break;
      case MainPressControlState.GoToStandby:
      case MainPressControlState.ServiceToStandby:
        this.menuPanelState = MainPressControlState.Standby;
        break;
      default:
        this.menuPanelState = val.CurrentPressState;
    }
  }

  onEntityStateChange() {
    this.currentButtonPressed = '';
    this.isShowSubMenu = false;
  }

  onShutdownBtnPressed() {
    this.currentButtonPressed = this.menusButtonPressCssClass.ShutdownPressed;
    this.controllerStoreService.controllerActionState = ControllerActionStates.shutdown;
  }
  onRestartBtnPressed() {
    this.currentButtonPressed = this.menusButtonPressCssClass.RestartPressed;
    this.controllerStoreService.controllerActionState = ControllerActionStates.restart;
  }
  onServiceBtnPressed() {
    this.currentButtonPressed = this.menusButtonPressCssClass.ServicePressed;
    this.controllerStoreService.controllerActionState = ControllerActionStates.goToService;
  }

  showSubmenu(): void {
    if (this.controllerStateEntity.CurrentPressState === MainPressControlState.Print) {
      this.isShowSubMenu = false;
    } else if (!this.isAnimationInProgress) {
      this.isShowSubMenu = !this.isShowSubMenu;
    }
  }

  slideSubMenuStart(event: Event): void {
    this.isAnimationInProgress = true;
  }

  slideSubMenuDone(event: Event): void {
    this.isAnimationInProgress = false;
  }
}
