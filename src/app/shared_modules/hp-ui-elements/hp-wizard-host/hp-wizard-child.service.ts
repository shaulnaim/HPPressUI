import { Injectable } from '@angular/core';
import { CalibrationStatus } from 'calibrations-api';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HpWizardChildService {
  private readonly _wizardHeaderState = new BehaviorSubject<CalibrationStatus>(null);
  private readonly _wizardProcessStarted = new BehaviorSubject<boolean>(null);
  private readonly _wizardCommitBtnAvailability = new BehaviorSubject<boolean>(null);
  private readonly _wizardCancelBtnAvailability = new BehaviorSubject<boolean>(null);
  private readonly _wizardOkBtnClicked = new BehaviorSubject<boolean>(null);
  private readonly _wizardCancelBtnClicked = new BehaviorSubject<boolean>(null);

  // Expose the observable$ part of the _controllerEntityState subject (read only stream)
  readonly wizardHeaderState$ = this._wizardHeaderState.asObservable();
  readonly wizardProcessStarted$ = this._wizardProcessStarted.asObservable();
  readonly wizardCommitBtnAvailability$ = this._wizardCommitBtnAvailability.asObservable();
  readonly wizardCancelBtnAvailability$ = this._wizardCancelBtnAvailability.asObservable();
  readonly wizardOkBtnClicked$ = this._wizardOkBtnClicked.asObservable();
  readonly wizardCancelBtnClicked$ = this._wizardCancelBtnClicked.asObservable();

  get wizardHeaderState(): CalibrationStatus {
    return this._wizardHeaderState.getValue();
  }

  set wizardHeaderState(val: CalibrationStatus) {
    this._wizardHeaderState.next(val);
  }
  get wizardProcessStarted(): boolean {
    return this._wizardProcessStarted.getValue();
  }

  set wizardProcessStarted(val: boolean) {
    this._wizardProcessStarted.next(val);
  }

  get wizardCommitBtnAvailability(): boolean {
    return this._wizardCommitBtnAvailability.getValue();
  }

  set wizardCommitBtnAvailability(val: boolean) {
    this._wizardCommitBtnAvailability.next(val);
  }

  get wizardCancelBtnAvailability(): boolean {
    return this._wizardCommitBtnAvailability.getValue();
  }

  set wizardCancelBtnAvailability(val: boolean) {
    this._wizardCancelBtnAvailability.next(val);
  }

  get wizardOkBtnClicked(): boolean {
    return this._wizardOkBtnClicked.getValue();
  }

  set wizardOkBtnClicked(val: boolean) {
    this._wizardOkBtnClicked.next(val);
  }

  get wizardCancelBtnClicked(): boolean {
    return this._wizardCancelBtnClicked.getValue();
  }

  set wizardCancelBtnClicked(val: boolean) {
    this._wizardCancelBtnClicked.next(val);
  }

  constructor() {}
}
