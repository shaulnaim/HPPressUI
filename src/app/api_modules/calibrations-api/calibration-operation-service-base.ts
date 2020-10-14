import { Observable } from 'rxjs';
import { CalibrationOperationBase } from './calibration-common-types';
import { StartStopOperationServiceBase } from 'hp-patterns-base-classes';
import { NotificationService, LoggerService, RestService } from 'hp-services';

export abstract class CalibrationOperationServiceBase<TCalibrationOperation extends CalibrationOperationBase> extends StartStopOperationServiceBase<
  TCalibrationOperation
> {
  public contentObservable$: Observable<TCalibrationOperation>;

  public commit(operation: TCalibrationOperation): Promise<void> {
    return this.restService.put(this.resourceName + `/commit`, operation);
  }

  public cancel(operation: TCalibrationOperation): Promise<void> {
    return this.restService.put(this.resourceName + `/cancel`, operation);
  }

  public update(operation: TCalibrationOperation): Promise<void> {
    return this.restService.put(this.resourceName + `/update`, operation);
  }

  constructor(
    protected resourceName: string,
    notificationService: NotificationService,
    protected logger: LoggerService,
    protected restService: RestService
  ) {
    super(resourceName, notificationService, logger, restService);
    this.contentObservable$ = this.getObservableSingle() as Observable<TCalibrationOperation>;
  }
}
