import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';

import {
  CalibrationServicesService,
  CalibrationState,
  CalibrationStatus,
  IlsCalibrationOperation,
  IlsCalibrationOperationModel
} from 'calibrations-api';
import { CalibrationBaseComponent } from 'hp-components-base-classes';
import { DestroyService } from 'hp-services';
import { HpWizardChildService } from 'hp-ui-elements';


export interface CalibartionStages {
  calibartionStages: CalibartionStep[];
}

export interface CalibartionStep {
  title: string;
  state: StageStatus;
}

export enum StageStatus {
  NotStarted = 'NotStarted',
  InProgress = 'InProgress',
  Succeeded = 'Succeeded',
  Failed = 'Failed'
}

@Component({
  selector: 'ils-calibration',
  templateUrl: './ils-calibration.component.html',
  styleUrls: ['./ils-calibration.component.scss']
})
export class IlsCalibrationComponent extends CalibrationBaseComponent<IlsCalibrationOperation> implements OnInit, OnDestroy {
  private _operationSubscription: Subscription;
  ilsCalibrationOperation: IlsCalibrationOperation;
  stages: CalibartionStep[];
  stageStatus = StageStatus;
  isShowPlayBtn = true;
  totalSeconds: number;

  infoText: string;
  subInfoText: string;
  timerSubscription: Subscription;

  constructor(
    private ilsOperationModel: IlsCalibrationOperationModel,
    calibrationServicesService: CalibrationServicesService,
    destroy$: DestroyService,
    private hpWizardChildService: HpWizardChildService
  ) {
    super(ilsOperationModel, calibrationServicesService);

    this._operationSubscription = this.ilsOperationModel.observable$.subscribe((op: IlsCalibrationOperation) => {
      this.ilsCalibrationOperation = op;
      this.hpWizardChildService.wizardHeaderState = this.ilsCalibrationOperation.CalibrationResult.Status;
      if (this.ilsCalibrationOperation.CalibrationState !== CalibrationState.NotStarted) {
        this.hpWizardChildService.wizardProcessStarted = true;
      } else {
        this.hpWizardChildService.wizardProcessStarted = false;
      }
      this.hpWizardChildService.wizardCommitBtnAvailability = this.ilsCalibrationOperation.CommitAvailability.IsAvailable;
      this.hpWizardChildService.wizardCancelBtnAvailability = this.ilsCalibrationOperation.CancelAvailability.IsAvailable;
      this.isShowPlayBtn = this.ilsCalibrationOperation.StartAvailability.IsAvailable;
      this.handleStartButton();
      this.updateOperation(this.ilsCalibrationOperation);
    });

    this.hpWizardChildService.wizardOkBtnClicked$
      .pipe(
        first((val) => val === true),
        takeUntil(destroy$)
      )
      .subscribe(() => {
        this.commit();
      });

    this.hpWizardChildService.wizardCancelBtnClicked$
      .pipe(
        first((val) => val === true),
        takeUntil(destroy$)
      )
      .subscribe(() => {
        this.cancel();
      });
  }

  ngOnInit() {
    super.ngOnInit();
    this.initProgressInfoText();
  }

  initProgressInfoText() {
    this.infoText = 'Press run to calibrate'; // TODO: i18n;
    this.subInfoText = 'This usualy takes 3-4 minutes'; // TODO: i18n;
  }

  handleStartButton() {
    if (this.isShowPlayBtn) {
      if (!this.timerSubscription?.closed) this.timerSubscription?.unsubscribe();
      this.initProgressInfoText();
    } else {
      this.infoText = 'Calibrating…'; // TODO: i18n;
      this.subInfoText = 'Time elapsed: 00:00'; // TODO: i18n;
      this.totalSeconds = 0;
      if (this.timerSubscription === undefined || this.timerSubscription?.closed) {
        // to avoid multiple subscriptions
        this.timerSubscription = interval(1000).subscribe(() => {
          this.countUpTimer();
        });
      }
    }
  }
  countUpTimer() {
    ++this.totalSeconds;
    let minute = Math.floor(this.totalSeconds / 60);
    let minuteStr = minute < 10 ? `0${minute}` : minute;
    let second = this.totalSeconds % 60;
    let secondStr = this.totalSeconds % 60 < 10 ? `0${second}` : second;
    this.subInfoText = `Time elapsed: ${minuteStr}:${secondStr}`;
  }

  ngOnDestroy() {
    this._operationSubscription.unsubscribe();
    this.hpWizardChildService.wizardCancelBtnClicked = false;
    this.hpWizardChildService.wizardOkBtnClicked = false;
    this.hpWizardChildService.wizardHeaderState = CalibrationStatus.None;
    if (this.timerSubscription) this.timerSubscription.unsubscribe();
    super.ngOnDestroy();
  }

  onProcessBtnClick() {
    if (this.isShowPlayBtn) {
      this.calibrationAdapter.start();
    } else {
      this.calibrationAdapter.stop();
    }
  }

  getIsDisabled(): boolean {
    if (
      (this.isShowPlayBtn && !this.ilsCalibrationOperation?.StartAvailability?.IsAvailable) ||
      (!this.isShowPlayBtn && !this.ilsCalibrationOperation?.StopAvailability?.IsAvailable)
    ) {
      this.initProgressInfoText();
      return true;
    } else {
      return false;
    }
  }
}
