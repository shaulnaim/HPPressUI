import { CalibrationResult, CalibrationOperationBase } from '../calibration-common-types';

export class IlsCalibrationOperation extends CalibrationOperationBase {
  public Stages: StageInfo[];
}

export class StageInfo {
  Name: string;
  Status: StageStatus;
}

export enum StageStatus {
  NotStarted = 'NotStarted',
  InProgress = 'InProgress',
  Succeeded = 'Succeeded',
  Failed = 'Failed'
}


