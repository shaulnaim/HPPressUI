import { Injectable } from '@angular/core';

import { LoggerService } from 'hp-services';
import { CalibrationOperationModelBase } from '../calibration-operation-model-base';
import { IlsCalibrationOperationService } from './ils-self-calibration-operation.service';
import { IlsCalibrationOperation } from './ils-self-calibration-types';

@Injectable({
  providedIn: 'root'
})
export class IlsCalibrationOperationModel extends CalibrationOperationModelBase<IlsCalibrationOperation> {
  constructor(service: IlsCalibrationOperationService, loggerService: LoggerService) {
    super(service, loggerService);
  }
}
