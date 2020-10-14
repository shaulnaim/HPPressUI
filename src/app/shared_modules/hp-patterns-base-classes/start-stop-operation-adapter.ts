import { Observable, Subscription } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { StartStopOperationModelBase } from './start-stop-operation-model-base';

import { StartStopOperationBase } from './common-interfaces';

type callback = (operation: StartStopOperationBase) => Observable<void>;

export class StartStopOperationAdapter<TStartStopOeration extends StartStopOperationBase> {
  public operationChanged = new EventEmitter<any>();
  public serverOperation: TStartStopOeration;
  public localOperation: TStartStopOeration;
  private _operationSubscription: Subscription;
  constructor(protected _operationModel: StartStopOperationModelBase<TStartStopOeration>) {
    this._operationSubscription = this._operationModel.observable$.subscribe((opt) => this.updateOperation(opt));
  }

  updateOperation(operation: TStartStopOeration) {
    if (this.localOperation == null) this.localOperation = operation;
    this.serverOperation = operation;
  }

  public start() {
    this._operationModel.start(this.localOperation);
  }

  public stop() {
    this._operationModel.stop(this.localOperation);
  }

  public dispose() {
    this._operationSubscription.unsubscribe();
  }
}
