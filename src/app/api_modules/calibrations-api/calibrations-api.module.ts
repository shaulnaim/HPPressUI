import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IlsCalibrationOperationModel } from './ils-self-calibration/ils-self-calibration-operation.model';
import { IlsCalibrationOperationService } from './ils-self-calibration/ils-self-calibration-operation.service';
import { CalibrationServicesService } from './calibration-services-service';

@NgModule({
  providers: [IlsCalibrationOperationModel, IlsCalibrationOperationService, CalibrationServicesService],
  imports: [CommonModule]
})
export class CalibrationsApiModule {}
