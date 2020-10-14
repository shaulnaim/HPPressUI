import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { ControllerActionStates } from '../controller-types';
import { MainPressControlState, MainPressControlEntity } from 'app-press-control-api';

@Injectable({
  providedIn: 'root'
})
export class ControllerStoreService {
  private readonly _controllerEntityState = new BehaviorSubject<MainPressControlEntity>(null);
  private readonly _controllerActionState = new BehaviorSubject<ControllerActionStates>(null);
  private readonly _lottieStates = new BehaviorSubject<MainPressControlState>(null);

  // Expose the observable$ part of the _controllerEntityState subject (read only stream)
  readonly controllerEntityState$ = this._controllerEntityState.asObservable();
  readonly controllerActionStates$ = this._controllerActionState.asObservable();
  readonly lottieStates$ = this._lottieStates.asObservable();

  get controllerEntityState(): MainPressControlEntity {
    return this._controllerEntityState.getValue();
  }

  set controllerEntityState(val: MainPressControlEntity) {
    this._controllerEntityState.next(val);
  }

  get lottieState(): MainPressControlState {
    return this._lottieStates.getValue();
  }

  set lottieState(val: MainPressControlState) {
    this._lottieStates.next(val);
  }

  get controllerActionState(): ControllerActionStates {
    return this._controllerActionState.getValue();
  }

  set controllerActionState(val: ControllerActionStates) {
    this._controllerActionState.next(val);
  }

  constructor() {}
}
