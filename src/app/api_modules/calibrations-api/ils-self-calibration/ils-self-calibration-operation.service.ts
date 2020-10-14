import { Injectable } from '@angular/core';

import { LoggerService, NotificationService, RestService } from 'hp-services';
import { CalibrationOperationServiceBase } from '../calibration-operation-service-base';
import { IlsCalibrationOperation } from './ils-self-calibration-types';

@Injectable({
  providedIn: 'root'
})
export class IlsCalibrationOperationService extends CalibrationOperationServiceBase<IlsCalibrationOperation> {
  constructor(notificationService: NotificationService, protected logger: LoggerService, protected restService: RestService) {
    super('IlsCalibrationFlowOperation', notificationService, logger, restService);
  }
}
