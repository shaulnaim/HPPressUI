import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef, ViewRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { MainPressControlState } from 'app-press-control-api';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { Animations } from '../../controller-animations';
import { ControllerStoreService } from '../../services/controller-store.service';
import { DestroyService } from 'hp-services';
//
import OffJson from 'assets/controller/json_animations/off.json';
import OffToReadyJson from 'assets/controller/json_animations/offToReady.json';
import OffToStandbyJson from 'assets/controller/json_animations/offToStandby.json';
import Off_ReadyToStandbyJson from 'assets/controller/json_animations/off_ReadyToStandby.json';
import Off_StandbyToReadyJson from 'assets/controller/json_animations/off_StandbyToReady.json';
//
import ErrorJson from 'assets/controller/json_animations/Error.json';
import ReadyJson from 'assets/controller/json_animations/Ready.json';
import PauseJson from 'assets/controller/json_animations/Pause.json';
import PauseBlinkJson from 'assets/controller/json_animations/PauseBlink.json';
import PrePrintJson from 'assets/controller/json_animations/PrePrinting.json';
import PrintingJson from 'assets/controller/json_animations/Printing.json';
import GoToServiceJson from 'assets/controller/json_animations/GoToService.json';
import ServiceJson from 'assets/controller/json_animations/Service.json';
import StandbyJson from 'assets/controller/json_animations/Standby.json';
import NoPowerJson from 'assets/controller/json_animations/noPower.json';
//
import ReadyToOffJson from 'assets/controller/json_animations/ReadyToOff.json';
import ReadyToStandbyJson from 'assets/controller/json_animations/ReadyToStandby.json';
import ReadyToPrintingJson from 'assets/controller/json_animations/PrePrinting.json';
import StandbyToOffJson from 'assets/controller/json_animations/StandbyToOff.json';
import StandbyToReadyJson from 'assets/controller/json_animations/StandbyToReady.json';
import ServiceToStandbyJson from 'assets/controller/json_animations/ServiceToStandby.json';
import { LoggerService } from 'hp-services';
//

@Component({
  selector: 'controller-lottie',
  templateUrl: './controller-lottie.component.html',
  styleUrls: ['./controller-lottie.component.scss'],
  animations: [Animations.fadeIn]
})
export class ControllerLottieComponent implements OnInit, AfterViewInit {
  currentLottie: MainPressControlState;
  private _animationItem: AnimationItem;

  offLottieConfig: AnimationOptions;
  offToReadyLottieConfig: AnimationOptions;
  offToStandbyLottieConfig: AnimationOptions;
  offReadyToStandbyLottieConfig: AnimationOptions;
  offStandbyToReadyLottieConfig: AnimationOptions;
  standbyLottieConfig: AnimationOptions;
  noPowerLottieConfig: AnimationOptions;
  goToServiceLottieConfig: AnimationOptions;
  errorLottieConfig: AnimationOptions;
  printingLottieConfig: AnimationOptions;
  readyLottieConfig: AnimationOptions;
  pauseLottieConfig: AnimationOptions;
  pauseBlinkLottieConfig: AnimationOptions;
  prePostPrintLottieConfig: AnimationOptions;
  serviceLottieConfig: AnimationOptions;
  serviceToStandbyLottieConfig: AnimationOptions;
  readyToOffLottieConfig: AnimationOptions;
  readyToStandbyLottieConfig: AnimationOptions;
  standbyToReadyLottieConfig: AnimationOptions;
  standbyToOffLottieConfig: AnimationOptions;
  @ViewChild('tplOff', { read: TemplateRef }) tplOff: TemplateRef<HTMLTemplateElement>;
  @ViewChild('tplOffToStandby', { read: TemplateRef }) tplOffToStandby: TemplateRef<HTMLTemplateElement>;
  @ViewChild('tplOffToReady', { read: TemplateRef }) tplOffToReady: TemplateRef<HTMLTemplateElement>;
  @ViewChild('tplOffReadyToStandby', { read: TemplateRef }) tplOffReadyToStandby: TemplateRef<HTMLTemplateElement>;
  @ViewChild('tplOffStandbyToReady', { read: TemplateRef }) tplOffstandbyToReady: TemplateRef<HTMLTemplateElement>;
  @ViewChild('tplNoPowe', { read: TemplateRef }) tplNoPower: TemplateRef<HTMLTemplateElement>;
  @ViewChild('tplError', { read: TemplateRef }) tplError: TemplateRef<HTMLTemplateElement>;
  @ViewChild('tplPrinting', { read: TemplateRef }) tplPrinting: TemplateRef<HTMLTemplateElement>;
  @ViewChild('tplGoToService', { read: TemplateRef }) tplGoToService: TemplateRef<HTMLTemplateElement>;
  @ViewChild('tplService', { read: TemplateRef }) tplService: TemplateRef<HTMLTemplateElement>;
  @ViewChild('tplStandby', { read: TemplateRef }) tplStandby: TemplateRef<HTMLTemplateElement>;
  @ViewChild('tplReady', { read: TemplateRef }) tplReady: TemplateRef<HTMLTemplateElement>;
  @ViewChild('tplPause', { read: TemplateRef }) tplPause: TemplateRef<HTMLTemplateElement>;
  @ViewChild('tplPrePostPrint', { read: TemplateRef }) tplPrePostPrint: TemplateRef<HTMLTemplateElement>;
  @ViewChild('tplReadyToStandby', { read: TemplateRef }) tplReadyToStandby: TemplateRef<HTMLTemplateElement>;
  @ViewChild('tplStandbyToReady', { read: TemplateRef }) tplStandbyToReady: TemplateRef<HTMLTemplateElement>;
  @ViewChild('tplServiceToStandby', { read: TemplateRef }) tplServiceToStandby: TemplateRef<HTMLTemplateElement>;
  @ViewChild('tplReadyToOff', { read: TemplateRef }) tplReadyToOff: TemplateRef<HTMLTemplateElement>;
  @ViewChild('tplStandbyToOff', { read: TemplateRef }) tplStandbyToOff: TemplateRef<HTMLTemplateElement>;
  @ViewChild('tplPowerDisable', { read: TemplateRef }) tplPowerDisable: TemplateRef<HTMLTemplateElement>;
  @ViewChild('viewContainerRef', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  constructor(
    private logger: LoggerService,
    private changeDetectorRef: ChangeDetectorRef,
    private controllerStoreService: ControllerStoreService,
    destroy$: DestroyService
  ) {
    this.controllerStoreService.lottieStates$.pipe(takeUntil(destroy$)).subscribe((val) => {
      if (val) {
        this.currentLottie = val;
        this.switchLotties();
      }
    });
  }
  ngOnInit(): void {
    this.offLottieConfig = {
      animationData: OffJson,
      renderer: 'svg',
      autoplay: true,
      loop: true
    };

    this.offToReadyLottieConfig = {
      ...this.offLottieConfig,
      animationData: OffToReadyJson
    };

    this.offToStandbyLottieConfig = {
      ...this.offLottieConfig,
      animationData: OffToStandbyJson
    };

    this.offReadyToStandbyLottieConfig = {
      ...this.offLottieConfig,
      animationData: Off_ReadyToStandbyJson
    };

    this.offStandbyToReadyLottieConfig = {
      ...this.offLottieConfig,
      animationData: Off_StandbyToReadyJson
    };

    this.readyLottieConfig = {
      ...this.offLottieConfig,
      animationData: ReadyJson
    };

    this.standbyLottieConfig = {
      ...this.offLottieConfig,
      animationData: StandbyJson
    };

    this.pauseBlinkLottieConfig = {
      ...this.offLottieConfig,
      animationData: PauseBlinkJson
    };

    this.pauseLottieConfig = {
      ...this.offLottieConfig,
      animationData: PauseJson
    };

    this.prePostPrintLottieConfig = {
      ...this.offLottieConfig,
      animationData: PrePrintJson
    };

    this.noPowerLottieConfig = {
      ...this.offLottieConfig,
      animationData: NoPowerJson
    };

    this.goToServiceLottieConfig = {
      ...this.offLottieConfig,
      animationData: GoToServiceJson
    };

    this.serviceLottieConfig = {
      ...this.offLottieConfig,
      animationData: ServiceJson
    };

    this.errorLottieConfig = {
      ...this.offLottieConfig,
      animationData: ErrorJson
    };

    this.printingLottieConfig = {
      ...this.offLottieConfig,
      animationData: PrintingJson
    };

    this.readyToOffLottieConfig = {
      ...this.offLottieConfig,
      animationData: ReadyToOffJson
    };

    this.readyToStandbyLottieConfig = {
      ...this.offLottieConfig,
      animationData: ReadyToStandbyJson
    };

    this.standbyToReadyLottieConfig = {
      ...this.offLottieConfig,
      animationData: StandbyToReadyJson
    };

    this.serviceToStandbyLottieConfig = {
      ...this.offLottieConfig,
      animationData: ServiceToStandbyJson
    };

    this.standbyToOffLottieConfig = {
      ...this.offLottieConfig,
      animationData: StandbyToOffJson
    };
  }

  ngAfterViewInit(): void {
    if (this.currentLottie) this.switchLotties();
  }

  animationCreated(animationItem: AnimationItem): void {
    this._animationItem = animationItem;
    this._animationItem.playSegments(
      [
        [0, 180],
        [180, 360]
      ],
      true
    );
  }

  switchLotties() {
    if (this.viewContainerRef) {
      let view: ViewRef;
      switch (this.currentLottie) {
        case MainPressControlState.Off:
          view = this.tplOff.createEmbeddedView(null);
          break;
        case MainPressControlState.OffToReady:
          view = this.tplOffToReady.createEmbeddedView(null);
          break;
        case MainPressControlState.OffToStandby:
          view = this.tplOffToStandby.createEmbeddedView(null);
          break;
        case MainPressControlState.OffReadyToStandby:
          view = this.tplOffReadyToStandby.createEmbeddedView(null);
          break;
        case MainPressControlState.OffStandbyToReady:
          view = this.tplOffstandbyToReady.createEmbeddedView(null);
          break;
        case MainPressControlState.Error:
          view = this.tplError.createEmbeddedView(null);
          break;
        case MainPressControlState.Ready:
          view = this.tplReady.createEmbeddedView(null);
          break;
        case MainPressControlState.Print:
          view = this.tplPrinting.createEmbeddedView(null);
          break;
        case MainPressControlState.Pause:
          view = this.tplPause.createEmbeddedView(null);
          break;
        case MainPressControlState.GoToService:
          view = this.tplGoToService.createEmbeddedView(null);
          break;
        case MainPressControlState.Service:
          view = this.tplService.createEmbeddedView(null);
          break;
        case MainPressControlState.Standby:
          view = this.tplStandby.createEmbeddedView(null);
          break;
        case MainPressControlState.ReadyToOff:
          view = this.tplReadyToOff.createEmbeddedView(null);
          break;
        case MainPressControlState.GoToStandby:
          view = this.tplReadyToStandby.createEmbeddedView(null);
          break;
        case MainPressControlState.PrePrint:
        case MainPressControlState.PostPrint:
          view = this.tplPrePostPrint.createEmbeddedView(null);
          break;
        case MainPressControlState.StandbyToReady:
          view = this.tplStandbyToReady.createEmbeddedView(null);
          break;
        case MainPressControlState.StandbyToOff:
        case MainPressControlState.ServiceToOff:
          view = this.tplStandbyToOff.createEmbeddedView(null);
          break;
        case MainPressControlState.ServiceToStandby:
          view = this.tplServiceToStandby.createEmbeddedView(null);
          break;
        case MainPressControlState.PowerDisable:
          view = this.tplPowerDisable.createEmbeddedView(null);
          break;
        default:
          this.logger.error(`${this.currentLottie}....Animation is missing`);
          return;
      }
      this.viewContainerRef.insert(view);
      this.changeDetectorRef.detectChanges();
    }
  }

  fadeDone(event: Event): void {
    while (this.viewContainerRef.length > 2) {
      this.viewContainerRef.remove(0);
    }
  }
}
