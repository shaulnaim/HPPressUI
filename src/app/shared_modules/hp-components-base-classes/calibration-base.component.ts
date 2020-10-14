import { Directive, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

import {
  CalibrationOperationBase,
  CalibrationOperationModelBase,
  CalibrationServicesService,
  CalibrationState,
  CalibrationStatus
} from 'calibrations-api';
import { StartStopOperationAdapter } from 'hp-patterns-base-classes';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export class CalibrationBaseComponent<TCalibrationOperation extends CalibrationOperationBase> implements OnInit, OnDestroy {
  @Output() closed = new EventEmitter<void>();
  public calibrationAdapter: StartStopOperationAdapter<TCalibrationOperation>;
  calibrationStatusValues = CalibrationStatus; // this is required for ngSwitchCase

  public scopeId = '';

  public showValidationErrors = false;

  public isStartAvailable = true;

  constructor(
    private calibrationOperationModel: CalibrationOperationModelBase<TCalibrationOperation>,
    private calibrationServicesService: CalibrationServicesService
  ) {
    this.calibrationAdapter = new StartStopOperationAdapter(calibrationOperationModel);
    this.calibrationServicesService = calibrationServicesService;
  }

  closeComponent() {
    this.closed.emit();
  }

  cancel() {
    this.calibrationOperationModel.cancel(this.calibrationAdapter.localOperation);
  }

  commit() {
    this.calibrationOperationModel.commit(this.calibrationAdapter.localOperation);
  }

  update() {
    this.calibrationOperationModel.update(this.calibrationAdapter.localOperation);
  }

  updateOperation(operation) {
    if (this.calibrationAdapter.localOperation.ScopeId === '') this.calibrationAdapter.localOperation.ScopeId = this.scopeId;
    if (operation.CalibrationState === CalibrationState.Completed) this.closeComponent();
  }

  async beginScopeAsync() {
    await this.calibrationServicesService.beginScope().then((id) => (this.scopeId = id));
  }

  ngOnInit() {
    this.beginScopeAsync();
  }

  ngOnDestroy() {
    this.calibrationServicesService.endScope(this.scopeId);
  }
}
