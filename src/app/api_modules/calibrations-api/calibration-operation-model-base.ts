import { StartStopOperationModelBase } from 'hp-patterns-base-classes';
import { CalibrationOperationServiceBase } from './calibration-operation-service-base';
import { CalibrationOperationBase } from './calibration-common-types';
import { LoggerService } from 'hp-services';

export abstract class CalibrationOperationModelBase<TCalibrationOperation extends CalibrationOperationBase> extends StartStopOperationModelBase<
  TCalibrationOperation
> {
  constructor(protected service: CalibrationOperationServiceBase<TCalibrationOperation>, protected logger: LoggerService) {
    super(service, logger);
  }
  public commit(operation: TCalibrationOperation): Promise<void> {
    return this.service.commit(operation);
  }

  public cancel(operation: TCalibrationOperation): Promise<void> {
    return this.service.cancel(operation);
  }

  public update(operation: TCalibrationOperation): Promise<void> {
    return this.service.update(operation);
  }
}
